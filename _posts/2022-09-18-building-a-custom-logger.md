---
layout: post
title: Building a custom logger handler
tags: logger
author: Lukas Larsson
---

The built in logger handlers in Erlang/OTP can handle most common usecases, but
sometimes you need to send the log data to some external service, or process the
log data somehow before it is sent on its way.

There are two different solutions to how to write a log handler, and which one is
best depends on whether you need somekind of overload protection or not.

### Building a log handler without overload protection

Creating a log handler that does not need any overload protection is the simplest
approach as it is just a matter of implementing the `log` callback function,
apply any formatting needed and the send the message on its way. The only log
mechanism that I can think of that does not need any overload protection is if
the log data is being sent using UDP. Below follows an example of how such a
handler could look like.

### Building a log handler with overload protection

The far more common case is when you need overload protection because you do
not know how long time it will take to store the log message. The standard
Erlang/OTP handlers have such functionality built into them, but that API is
not exposed to any user. What is exposed however is that the `logger_std_h`
handler can take a `{device, Pid}` as its type. This will instruct `logger_std_h`
to sent formatted log messages to that pid using the [io protocol](). So all we
need to do in order to create a logger handler that has overload protection
is to implement a gen_server that handles the info requests needed by an io server.
Below is an example of such a process that stores the last 100 log messages in
a queue.

```erlang
%%%===================================================================
%%% API
%%%===================================================================

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

%%%===================================================================
%%% gen_server callbacks
%%%===================================================================

init([]) ->
    {ok, {0, queue:new()}}.

%% Remove the oldest item in the queue
handle_info(Msg, {Cnt, Q}) when Cnt == 100 ->
    {_, NewQ} = queue:out(Q),
    handle_info(Msg, {Cnt-1, NewQ});
%% Handle a new log entry
handle_info({io_request, From, Ref, {put_chars, unicode, Msg}}, {Cnt, Q}) ->
    %% Reply to logger that we have handles it
    From ! {io_reply, Ref, ok},
    %% Add the message to the queue
    {noreply, {Cnt+1, queue:in(Msg, Q)}}.
```

This gen_server could be extended to allow fetching of the queue so that it
can be viewed when debugging the system. You can put whatever code you want
in the gen_server and know that the overload protection mechanisms of `logger_std_h`
will make sure that your system does not crash because of excessive logging.

To add the new io server as a handle you can use the logger API:

```erlang
{ok, Pid} = my_handler:start_link(),
logger:add_handler(my_handler, logger_std_h, #{ config => #{ type => {device, P} } }).
```

or you can 
