import View from '../core/view';

export interface NewsStore {
    getAllFeeds: () => NewsFeed[];
    getFeed: (position: number) => NewsFeed;
    setFeeds: (feeds: NewsFeed[]) => void;
    makeRead: (id: number) => void;
    hasFeeds: boolean;
    currentPage: number;
    numberOfFeed: number;
    nextPage: number;
    prevPage: number;
}


export interface News {
    readonly id: number; // 수정 불가능하게 하는 속성 (readonly)
    readonly time_ago: string;
    readonly title: string;
    readonly url: string;
    readonly user: string;
    readonly content: string;
}

export interface NewsFeed extends News {
    readonly comments_count: number;
    readonly points: number;
    read?: boolean; //원래 없던 데이터내용.(optional) 선택 속성 마킹을 할 수 있다. -> '?'를 이용한다.
}

export interface NewsDetail extends News {
    readonly comments: NewsComment[];
}

export interface NewsComment extends News {
    readonly comments: NewsComment[];
    readonly level: number;
}

export interface RouteInfo {
    path: string;
    page: View;
}