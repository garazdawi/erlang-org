import Head from 'next/head'
import Link from 'next/link'
import type { FunctionComponent } from 'react';

const Header: FunctionComponent = ({ }) => {
    return (
        <div className="navbar" style={{ 'backgroundColor': '#FFF', 'marginBottom': '0px' }}>
            <div className="container">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse"
                    style={{ position: 'absolute', right: '5px', 'marginBottom': '0px' }}>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
                <a className="navbar-brand" href="/"><img src="/img/erlang.png" width="60" /></a>
                <div className="nav-collapse collapse navbar-responsive-collapse" style={{ padding: '20px' }}>
                    <ul className="nav navbar-nav">
                        <li><Link href="/downloads"><a className="menu-headlines" > DOWNLOADS </a></Link></li>
                        <li><Link href="/docs"><a className="menu-headlines" > DOCUMENTATION </a></Link></li>
                        <li><Link href="/community"><a className="menu-headlines"> COMMUNITY </a></Link></li>
                        <li><Link href="/news"><a className="menu-headlines"> NEWS </a></Link></li>
                        <li><Link href="/eeps"><a className="menu-headlines"> EEPS </a></Link></li>
                        <li><Link href="/blog"><a className="menu-headlines"> BLOG </a></Link></li>
                        <li><Link href="/about"><a className="menu-headlines"> ABOUT </a></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const Footer: FunctionComponent = ({ }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="divider"><p /></div>
                </div>
                <div className="col-lg-12 text-center">
                    <div className="col-lg-4">
                        <Link href="/download.html"><a title="DOWNLOAD"><img src="/img/download.png" /></a></Link>
                    </div>
                    <div className="col-lg-4">
                        <Link href="http://www.github.com/erlang/otp"><a><img src="/img/GitHub-Mark-32px.png" /></a></Link>
                    </div>
                    <div className="col-lg-4">
                        <Link href="http://www.twitter.com/erlang_org"><a><img src="/img/twitter.png" width="32" /></a></Link>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="divider"><p /></div>
                </div>
            </div>
        </div>
    )
}

const Base: FunctionComponent = ({ children }) => {
    return (
        <>
            <Head>
                <title>Erlang Programming Language</title>
                <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
                <meta name="description" content="Erlang Programming Language" />
                <meta name="keywords" content="erlang, functional, programming, fault-tolerant, distributed, multi-platform, portable, software, multi-core, smp, concurrency" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <link rel="alternate" type="application/rss+xml" title="Overall RSS 2.0 Feed" href="/rss" />
                <link rel="alternate" type="application/rss+xml" title="News RSS 2.0 Feed" href="/rss/news" />
                <link rel="alternate" type="application/rss+xml" title="Article RSS 2.0 Feed" href="/rss/articles" />
                <link rel="alternate" type="application/rss+xml" title="Events RSS 2.0 Feed" href="/rss/event" />
                <link rel="alternate" type="application/rss+xml" title="Downloads RSS 2.0 Feed" href="/rss/download" />

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
                    crossOrigin="anonymous"></script>

            </Head>

            <Header />

            {children}

            <Footer />
        </>
    )
}

export default Base;