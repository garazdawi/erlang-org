import Base from '../components/Base'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export default function Docs({ links }: { links: string }) {
    return (
        <Base>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="divider"><p /></div>
                    </div>

                    <div className="col-lg-12">
                        <h3 className="sub-headlines">
                            <img src="/img/lightbubble.png" />
                            <span style={{ position: "relative", top: "5px", left: "20px" }}>DOCUMENTATION</span>
                        </h3>
                        <div className="col-lg-9">
                            <ReactMarkdown children={links} plugins={[gfm]} />
                        </div>

                        <div className="col-lg-3">
                            <p>
                                <a href="/faq/faq.html">The Erlang/OTP FAQ</a>
          - Frequently Asked Questions about all aspects of Erlang
        </p>

                            <div className="divider"><p /></div>
                            <p>
                                ErlDoc is a documentation search tool. Its goal is to increase
                                the usability of Erlang documentation and to find information
                                quickly and effectively.
	</p>
                            <form name="erldoc" action="/erldoc" method="get" className="form-inline">
                                <input type="text" name="q" className="form-control" style={{ width: "75%" }} />
                                <input type="image" src="/img/search.png" style={{ width: "30px", position: "relative", top: "10px" }} />
                            </form>
                            <p>It searches for function, module or application names similar
          to the search string. Try e.g "list" or "mnesia"</p>

                            <div className="divider"><p /></div>
                            <p><a href="https://erlang.org/mailman/listinfo/">Mailing lists</a> - The erlang.org mailing lists</p>

                            <div className="divider"><p /></div>
                            <p><a href="/docs/versions/">Documentation index</a> of all releases</p>

                            <div className="divider"><p /></div>
                            <p>Erlang Books</p>
                            <p>
                                <a target="_blank" href="http://www.pragprog.com/titles/jaerlang/programming-erlang">
                                    <img src="/img/books/jaerlang.jpg" height="120" width="91" border-width="1px" alt="Book cover of Programming Erlang" />
                                </a>
                                <a target="_blank" href="http://oreilly.com/catalog/9780596518189">
                                    <img src="/img/books/oreilly_programming_erlang.gif" height="120" border-width="1px" alt="Book cover of Erlang Programming" />
                                </a>
                            </p>
                            <p>
                                <a target="_blank" href="http://nostarch.com/erlang">
                                    <img src="/img/books/lyse.png" height="120" border-width="1px" alt="Book cover of Erlang Programming" />
                                </a>
                                <a target="_blank" href="http://shop.oreilly.com/product/0636920025818.do">
                                    <img src="/img/books/oreilly_erlang.jpg" height="120" border-width="1px" alt="Book cover of Erlang Programming" />
                                </a>
                            </p>
                            <p>
                                <a target="_blank" href="http://www.manning.com/logan/">
                                    <img src="/img/books/otp_in_action.jpg" height="120" width="91" border-width="1px" alt="Book cover of Erlang Programming" />
                                </a>
                                <a target="_blank" href="http://shop.oreilly.com/product/0636920024149.do">
                                    <img src="/img/books/scalability_earlyrelease.gif" height="120" width="91" border-width="1px" alt="Book cover of Erlang Programming" />
                                </a>
                            </p>
                            <a href="https://erlangcentral.org/books">And More...</a>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    );
}

import type { GetStaticProps } from 'next'


export const getStaticProps: GetStaticProps = async (context) => {
    const md = "docs";
    const require_ctx = require.context('../content/', false, /\.md/);
    return { props: { links: require_ctx("./" + md + ".md").default } }
}
