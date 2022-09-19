%%%-------------------------------------------------------------------
%%% @author Lukas Larsson <lukas.larsson@erlang-solutions.com>
%%% @copyright (C) 2022, Lukas Larsson
%%% @doc
%%%
%%% @end
%%% Created : 17 Sep 2022 by Lukas Larsson <lukas.larsson@erlang-solutions.com>
%%%-------------------------------------------------------------------
-module(sink).

-behaviour(gen_server).

%% API
-export([start_link/0]).

%% gen_server callbacks
-export([init/1, handle_info/2]).

-define(SERVER, ?MODULE).

%%%===================================================================
%%% API
%%%===================================================================

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

%%%===================================================================
%%% gen_server callbacks
%%%===================================================================

init([]) ->
    {ok, {0, []}}.

handle_info(Msg, {Cnt, Acc}) when Acc =/= [], Cnt rem 100 == 0 ->
    Filename = lists:flatten(io_lib:format("log.~p",[Cnt div 100])),
    Content = lists:join($\n,lists:reverse(Acc)),
    file:write_file(Filename, Content),
    handle_info(Msg, {0, []});
handle_info({io_request, From, Ref, {put_chars, unicode, Msg}}, {Cnt, Acc}) ->
    From ! {io_reply, Ref, ok},
    {noreply, {Cnt+1, [Msg|Acc]}}.
