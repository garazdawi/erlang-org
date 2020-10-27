#!/usr/bin/env escript

-mode(compile).
-include_lib("xmerl/include/xmerl.hrl").

main([File]) ->
    {ok, B} = file:read_file(File),
    Tags = [{"&nbsp;","\\&#160;"},
            {"&quot;","\\&#34;"},
            {"&ldquo;","\\&#8220;"},
            {"&rdquo;","\\&#8221;"}],
    {XML,_} = xmerl_scan:string(replace(Tags, B)),
    Articles = articles(XML),
    [case file:write_file(Filename,unicode:characters_to_binary(Content, utf8)) of
         ok -> ok;
         {error,_} ->
             io:format("~s: ~p~n",[Filename,unicode:characters_to_binary(Content, utf8)]),
             exit(0)
     end || {Filename,Content} <- Articles].

replace(Tags, Bin) ->
    lists:foldl(fun({What,With},B) ->
                        re:replace(B,What,With,[{return,list},global])
                end,Bin,Tags).

articles(#xmlElement{ name = articles, content = Content }) ->
    lists:flatmap(fun article/1, Content).

article(#xmlElement{ name = article, content = Content }) ->
    Props =
        lists:flatmap(
          fun(#xmlElement{ name = N, content = C }) ->
                  [{N,C}];
             (_) ->
                  []
          end,Content),
    Markdown = proplists:get_value(content, Props),
    Frontmatter = proplists:delete(content, Props),
%    io:format("Parsing: ~p~n",[render(proplists:get_value(id,Frontmatter))]),
    [{render(proplists:get_value(id,Frontmatter)) ++ ".md",
      ["---\n",
       [case render(C) of
             "" -> [];
            Val ->
                [yamlify(Name),": \"",string:replace(Val,"\"","\\\"",all),"\"\n"]
        end || {Name,C} <- Frontmatter],
       "---\n",
       html_to_markdown(Markdown)
      ]}];
article(_) ->
    [].

render([E|T]) ->
    [render(E)|render(T)];
render([]) ->
    [];
render(#xmlText{ value = V }) ->
    V.

yamlify(Name) ->
    replace([{"-","_"}],atom_to_list(Name)).

html_to_markdown([E|T]) ->
    [html_to_markdown(E) | html_to_markdown(T)];
html_to_markdown([]) ->
    [];
html_to_markdown(#xmlElement{ name = Ignore, content = Cs })
  when Ignore =:= span;
       Ignore =:= 'div';
       Ignore =:= font;
       Ignore =:= pre;
       Ignore =:= wbr ->
    html_to_markdown(Cs);
html_to_markdown(#xmlElement{ name = h1, content = Cs }) ->
    ["# ", string:trim(html_to_markdown(Cs)), "\n"];
html_to_markdown(#xmlElement{ name = h2, content = Cs }) ->
    ["## ", string:trim(html_to_markdown(Cs)), "\n"];
html_to_markdown(#xmlElement{ name = h3, content = Cs }) ->
    ["### ", string:trim(html_to_markdown(Cs)), "\n"];
html_to_markdown(#xmlElement{ name = hr, content = Cs }) ->
    ["****** ", string:trim(html_to_markdown(Cs)), "\n"];
html_to_markdown(#xmlElement{ name = p, content = Cs }) ->
    ["\n", html_to_markdown(Cs), "\n"];
html_to_markdown(#xmlElement{ name = 'div', content = Cs }) ->
    html_to_markdown(Cs);
html_to_markdown(#xmlElement{ name = ul, content = Cs }) ->
    [["* ", string:trim(html_to_markdown(C)), "\n"] || #xmlElement{ content = C } <- Cs];
html_to_markdown(#xmlElement{ name = strong, content = Cs }) ->
    ["**", html_to_markdown(Cs), "**"];
html_to_markdown(#xmlElement{ name = em, content = Cs }) ->
    ["*", html_to_markdown(Cs), "*"];
html_to_markdown(#xmlElement{ name = code, content = Cs }) ->
    ["`", html_to_markdown(Cs), "`"];
html_to_markdown(#xmlElement{ name = br, content = _Cs }) ->
    ["\n"];
html_to_markdown(#xmlElement{ name = a, attributes = Attrs, content = Cs }) ->
    Href = lists:keyfind(href,#xmlAttribute.name,Attrs),
    ["[", html_to_markdown(Cs), "](",Href#xmlAttribute.value,")"];
html_to_markdown(#xmlText{ parents = [{content,_}|_], value = " " }) ->
    "";
html_to_markdown(#xmlText{ value = Val }) ->
    unicode:characters_to_list(Val, utf8).
