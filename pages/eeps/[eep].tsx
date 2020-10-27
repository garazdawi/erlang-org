import Base from '../../components/Base'
import type { EEPItem } from '../../lib/eeps'

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
import { getAllEEPs } from '../../lib/eeps'

export const getStaticProps: GetStaticProps = async (context) => {
    const eep = context.params?.eep as string;
    const id = eep.slice(4);
    return { props: { index: getAllEEPs()[id] } }
}

export const getStaticPaths: GetStaticPaths = async () => {

    const eeps = getAllEEPs();

    let paths: string[] = [];
    for (const eep in eeps) {
        paths.push(`/eeps/eep-${encodeURIComponent(eep)}`)
    }

    return {
        paths,
        fallback: false
    }
}