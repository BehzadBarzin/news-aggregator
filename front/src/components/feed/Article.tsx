import { FC } from "react"

export type TArticle = {
    id: number,
    published_at: Date,
    category: string,
    source: string,
    authors: string[],
    title: string,
    url: string
}

type ArticleProps = {
    article: TArticle,
}

// An article card on the Feed page
const Article: FC<ArticleProps> = ({ article }) => {
  return (
    <div className="p-4">
        <div>
            <h2 className="font-poppins font-bold xs:text-[21px] text-[16px] xs:leading-[21px] leading-[21px] text-gradient mb-6">{article.title}</h2>
            <p className="font-poppins font-normal xs:text-[16px] text-[12px] xs:leading-[21px] leading-[21px] text-gradient mb-6">
                <span className="font-bold">Authors:</span> {' '}
                {
                    // Authors names
                    article.authors.map((auth: string, idx: number) => {
                        // If just one author
                        if (article.authors.length === 1) {
                            return `${auth}`;
                        }
                        // If multiple authors
                        if (idx < article.authors.length) {
                            // Every author (not last)
                            return `${auth}, `;
                        } else {
                            // Last author
                            return `and ${auth}`;
                        }
                    })
                }
            </p>
            <p className="font-poppins font-normal xs:text-[14px] text-[10px] xs:leading-[16px] leading-[14px] text-gradient mb-6">
                {article.published_at.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour: "2-digit", minute: "2-digit"})}
            </p>
        </div>
        <div className="flex justify-end mt-4">
            <a href={article.url} className="text-xl font-medium text-blue-400">{'Go To Article >'}</a>
        </div>
    </div>
  )
}

export default Article