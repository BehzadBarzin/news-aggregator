import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { API_URL } from "../constants/Constants";
import axios from "axios";
import Article, { TArticle } from "../components/feed/Article";

function getEnumKeyByEnumValue(myEnum, enumValue) {
    const keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}

enum Sources {
    GUARDIAN = '1',
    NYT = '2',
    NEWS_API = '3',
}

enum Categories {
    Business = '1',
    Science = '2',
    Sports = '3',
    Technology = '4',
    Health = '5',
    Entertainment = '6',
    General = '7',
}

type FiltersType = {
    page: number,
    authors?: string[],
    sources?: string[],
    categories?: string[],
    keywords?: string[]
}

function Feed() {
    const [filters, setFilters] = useState<FiltersType>({
        page: 1,
    });

    const [articles, setArticles] = useState<TArticle[]>([]);
    
    const [lastPage, setLastPage] = useState<number>(1);

    const getData = useCallback(async () => {
        const res = await axios.get(`${API_URL}/articles`, {
            params: {
                page: filters.page,
                sources: filters.sources ? JSON.stringify(filters.sources) : '[]',
                categories: filters.categories ? JSON.stringify(filters.categories) : '[]',
                authors: filters.authors ? JSON.stringify(filters.authors) : '[]',
                keywords: filters.keywords ? JSON.stringify(filters.keywords) : '[]'
            }
        });
        
        setLastPage(res.data.last_page);

        setArticles(() => {
            return res.data.data.map((a: any) => ({
                id: a.id,
                published_at: new Date(a.published_at),
                category: a.source_category.category.name,
                source: a.source_category.source.name,
                authors: a.authors.map((auth: any) => auth.name),
                title: a.title,
                url: a.url
            }));
        });
    }, [filters]);
    
    useEffect(() => {
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const onSourceChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setFilters((prev) => {
                return {
                    ...prev,
                    sources: prev.sources ? [...prev.sources, e.target.name] : [e.target.name]
                }
            });
        } else {
            setFilters((prev) => ({
                ...prev,
                sources: prev.sources?.filter((s) => s != e.target.name)
            }));
        }
    
    }

    const isSourceChecked = (source: Sources): boolean => {
        return filters.sources?.includes(source);
    }

    const onCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setFilters((prev) => {
                return {
                    ...prev,
                    categories: prev.categories ? [...prev.categories, e.target.name] : [e.target.name]
                }
            });
        } else {
            setFilters((prev) => ({
                ...prev,
                categories: prev.categories?.filter((s) => s != e.target.name)
            }));
        }
    
    }

    const isCategoryChecked = (c: Categories): boolean => {
        return filters.categories?.includes(c);
    }

return (
<div className={`min-h-screen`}>
<button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>
{/* Sidebar */}
<aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div className="font-poppins h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
            <li className="flex flex-col items-start p-2 text-white group">
                {/* Source */}
                <h4 className="mb-5">
                    Sources: 
                </h4>
                <div className="flex items-center mb-2">
                    <input checked={isSourceChecked(Sources.GUARDIAN)} onChange={onSourceChange} name={`${Sources.GUARDIAN}`} id="guardian" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="guardian" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">The Guardian</label>
                </div>
                <div className="flex items-center mb-2">
                    <input checked={isSourceChecked(Sources.NYT)} onChange={onSourceChange} name={`${Sources.NYT}`} id="nyt" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="nyt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">New York Times</label>
                </div>
                <div className="flex items-center mb-2">
                    <input checked={isSourceChecked(Sources.NEWS_API)} onChange={onSourceChange} name={`${Sources.NEWS_API}`} id="news-api" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="news-api" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">News API</label>
                </div>
            </li>
        </ul>
        {/* With top line */}
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-700">
            <li className="flex flex-col items-start p-2 text-white group">
                    {/* Categories */}
                    <h4 className="mb-5">
                        Categories: 
                    </h4>
                    {
                        Object.values(Categories).map((c) => {
                            return (
                                <div className="flex items-center mb-2">
                                    <input checked={isCategoryChecked(c)} onChange={onCategoryChange} name={c} id={c} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor={c} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{`${getEnumKeyByEnumValue(Categories, c)}`}</label>
                                </div>
                            )
                        })
                    }
                </li>
        </ul>
    </div>
</aside>

    <div className="p-4 sm:ml-64">
        {/* Pagination buttons */}
        <div className="flex flex-row justify-center mb-3 ">
        <button type="button" className="border-2 border-gray-700 border-dashed text-xl inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            disabled={filters.page == 1}
            onClick={() => (setFilters(prev => ({...prev, page: prev.page - 1})))}>
            {'Previous'}
        </button>
        <button type="button" className="border-2 border-gray-700 border-dashed text-xl inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            disabled={filters.page >= lastPage}
            onClick={() => (setFilters(prev => ({...prev, page: prev.page + 1})))}>
            {'Next'}
        </button>
        </div>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Each article */}
                {
                    articles.map((a: TArticle) => {
                        return (
                            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                                <p className="text-2xl text-gray-100 dark:text-gray-200">
                                    <Article article={a}/>
                                </p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
        </div>
    </div>
    )
}

export default Feed