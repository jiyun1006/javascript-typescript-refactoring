>### 여덟 번째 리팩토링   

<br>

#### 전역 상태 관리     

- 모든 파일에서 쓰는 뉴스 데이터를 담는 `Store` 클래스가 전역상태로 관리가 돼야 한다.

- `src` 디렉토리 바로 밑에 `store.ts` 파일을 생성한다.    
    - 기본 생성자를 만들고 클래스를 만든다.   
    ```js
    class Store {
        private feeds: NewsFeed[];
        private currentPage: number;
        constructor() {
            this.feeds = [];
            this.currentPage = 1;
        }
    }

    ```   
    - 외부에서 Store의 값을 건들면 안되기 때문에, private으로 외부 접근을 제어한다.    

    - 하지만, private으로 설정하게 되면, 부르는 것까지 막게 되므로, 다른 방법을 찾아야한다.    

    - 따라서, 내부에 메서드를 만들어서 부를 수 있게 한다.    

    - `Store` 클래스의 값중 currentPage를 부르기 위해서 get, set을 이용해서 메서드를 만든다.   
      (나중에 /types/index.ts 에 interface를 추가할 때(`NewsStore`), get, set 을 이용해서 만든 메서드는 메서드가 아니라, 속성으로 받는다.)    

    ```js
    class Store implements NewsStore {
        // '''생략'''

        get currentPage() {  // 외부에서 _currentPage의 값을 부를 수 있다.
            return this._currentPage;
        }

        set currentPage(page: number) { // 외부에서 _currentPage의 값을 설정할 수 있다.
            this._currentPage = page;
        }
    }


    ```   

    - `NewsStore` interface를 작성한다. (get, set을 이용한 메서드는 속성으로 받음)

    ```js
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
    ```   

    