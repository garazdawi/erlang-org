import Base from '../components/Base'
import type { EEPItem } from '../lib/eeps'

export default function EEPs({ index }: { index: EEPItem }) {
    return (<Base>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="divider"><p /></div>
                </div>
                <div className="static_div" dangerouslySetInnerHTML={{ __html:index.content }}>
                    
                </div>
            </div>
        </div>
    </Base>);
}

import type { GetStaticProps, GetStaticPaths } from 'next'
import { getAllEEPs } from '../lib/eeps'

export const getStaticProps: GetStaticProps = async (context) => {
    return { props: { index: getAllEEPs()['0000'] } }
}
