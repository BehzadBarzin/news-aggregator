import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { API_URL } from "../constants/Constants";
import axios from "axios";
import Article, { TArticle } from "../components/feed/Article";
import { useIsAuthenticated, useAuthHeader } from "react-auth-kit";
import styles from "../constants/styles";

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

type AuthorType = {
    id: number,
    name: string
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
        return filters.sources?.includes(source) || false;
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
        return filters.categories?.includes(c) || false;
    }

    const [authors, setAuthors] = useState<AuthorType[]>([]);
    useEffect(() => {
        const getAuthors = async () => {
            const res = await axios.get(`${API_URL}/authors`);
            setAuthors(res.data);
        }

        getAuthors();
    }, []);

    const onAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setFilters((prev) => {
                return {
                    ...prev,
                    authors: prev.authors ? [...prev.authors, e.target.name] : [e.target.name]
                }
            });
        } else {
            setFilters((prev) => ({
                ...prev,
                authors: prev.authors?.filter((s) => s != e.target.name)
            }));
        }
    
    }

    const isAuthorChecked = (id: number): boolean => {
        return filters.authors?.includes(`${id}`) || false;
    }


    const [keywordInputValue, setKeywordInputValue] = useState<string>('');

    const onKeywordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeywordInputValue(e.target.value);
    }

    const addKeyword = (kw: string) => {
        setFilters((prev) => {
            return {
                ...prev,
                keywords: prev.keywords ? [...prev.keywords, kw] : [kw]
            }
        });
    }

    const removeKeyword = (kw: string) => {
        setFilters((prev) => {
            return {
                ...prev,
                keywords: prev.keywords?.filter((s) => s != kw)
            }
        });
    }

    const isAuthenticated = useIsAuthenticated();
    const authHeader = useAuthHeader()

    // On the first render get the user's preferences from server and set them to filters state
    useEffect(() => {
        if (!isAuthenticated()) return;
        const getPrefs = async () => {
            const res = await axios.get(`${API_URL}/preferences`, {
                headers: { Authorization: authHeader() }
            });

            setFilters((prev) => {
                return {
                    ...prev,
                    authors: res.data.authors ? JSON.parse(res.data.authors) : [],
                    sources: res.data.sources ? JSON.parse(res.data.sources) : [],
                    categories: res.data.categories ? JSON.parse(res.data.categories) : [],
                    keywords: res.data.keywords ? JSON.parse(res.data.keywords) : [],
                }
            })
        }
        getPrefs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Every time the filters state changes, save the changes to the user's preferences
    useEffect(() => {
        if (!isAuthenticated()) return;
        console.log(filters.categories);
        const sendPrefs = async () => {
            const res = await axios.post(`${API_URL}/preferences`, {
                authors: filters.authors,
                sources: filters.sources,
                categories: filters.categories,
                keywords: filters.keywords
              }, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: authHeader()
                }
              });
        };

        sendPrefs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

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
        {/* Source */}
        <ul className="space-y-2 font-medium">
            <li className="flex flex-col items-start p-2 text-white group">
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
        {/* Categories */}
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-700">
            <li className="flex flex-col items-start p-2 text-white group">
                    <h4 className="mb-5">
                        Categories: 
                    </h4>
                    {
                        Object.values(Categories).map((c) => {
                            return (
                                <div key={c} className="flex items-center mb-2">
                                    <input checked={isCategoryChecked(c)} onChange={onCategoryChange} name={c} id={c} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor={c} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{`${getEnumKeyByEnumValue(Categories, c)}`}</label>
                                </div>
                            )
                        })
                    }
                </li>
        </ul>
        {/* Keywords */}
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-700">
        <li className="flex flex-col items-start p-2 text-white group">
        <h4 className="mb-5">
            Keywords: 
        </h4>
        <div className="max-w-lg">
            <div className="relative">
                <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter some tags" 
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') addKeyword(keywordInputValue);
                    }}
                    onChange={onKeywordInputChange}
                    value={keywordInputValue}
                />
                <div className="hidden">
                    <div className="absolute z-40 left-0 mt-2 w-full">
                        <div className="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
                        <a className="block py-1 px-5 cursor-pointer hover:bg-indigo-600 hover:text-white">Add tag "<span className="font-semibold" x-text="textInput"></span>"</a>
                    </div>
                </div>
                </div>
                {/* Keywords in use */}
                {
                    filters.keywords ? filters.keywords.map((f) => {
                        return (
                            <div  key={f} className="bg-blue-600 inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden">
                                <span className="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1" x-text="tag">{f}</span>
                                <button className="w-6 h-8 inline-block align-middle text-white bg-blue-400 focus:outline-none"
                                    onClick={() => { removeKeyword(f) }}>
                                    <svg className="w-6 h-6 fill-current mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fillRule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"/></svg>
                                </button>
                            </div>
                        );
                    }) : null
                }
            </div>
        </div>
        </li>
        </ul>
        {/* Authors */}
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-700">
            <li className="flex flex-col items-start p-2 text-white group">
                    <h4 className="mb-5">
                        Authors: 
                    </h4>
                    <div className="overflow-scroll h-[300px]">
                    {
                        authors.map((a: AuthorType) => {
                            return (
                                <div key={a.id} className="flex items-center mb-2">
                                    <input checked={isAuthorChecked(a.id)} onChange={onAuthorChange} name={`${a.id}`} id={`${a.id}`} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor={`${a.id}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{a.name}</label>
                                </div>
                            )
                        })
                    }
                    </div>
                </li>
        </ul>
    </div>
</aside>

    <div className="p-4 sm:ml-64">
        {/* Pagination buttons */}
        <div className="flex flex-row justify-center items-center mb-3 ">
            <button type="button" className="border-2 border-gray-700 border-dashed text-xl inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                disabled={filters.page == 1}
                onClick={() => (setFilters(prev => ({...prev, page: prev.page - 1})))}>
                {'Previous'}
            </button>
            <h3 className="font-poppins text-2xl font-bold text-gradient ml-4 mr-4 ">
                Page {filters.page} / {lastPage}
            </h3>
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
                            <div  key={a.id} className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                                <div className="text-2xl text-gray-100 dark:text-gray-200">
                                    <Article article={a}/>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
                {
                    articles.length === 0 ?
                    <div className={`${styles.flexCenter}`}> 
                        <h1 className="font-poppins text-2xl font-bold text-gradient mb-6">
                            No Articles
                        </h1>
                    </div>
                    : null
                }
        </div>
        </div>
    </div>
    )
}

export default Feed