>### 세 번째 리팩토링   

<br>

#### 인터페이스   

- `인터페이스`는 `type`를 대체할 수 있다. (거의 동일한 기능을 한다.)   
    - 쓰임새도 상당히 비슷한 걸 알 수 있다.   
    ```js
    //type
    type Store = {
        currentPage: number;
        feeds: NewsFeed[];
    }

    //interface
    interface Store {
        currentPage: number;
        feeds: NewsFeed[];
    }

    ```   

    - 다만 공통된 타입을 합칠 때, `&` 를 이용했지만, interface는 `extends`를 이용한다.   

    ```js
    //type
    interface NewsFeed & News = {
        comments_count: number;
        points: number;
        read?: boolean;
    }


    //interface
    interface NewsFeed extends News {
        comments_count: number;
        points: number;
        read?: boolean;
    }

    ```   

    - `interface`는 더욱 명시적으로 표현하는 특징이 있다. (`&`와 `extends`의 차이처럼)   

