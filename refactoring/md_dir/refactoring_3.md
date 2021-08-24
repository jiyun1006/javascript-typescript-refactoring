>### 세 번째 리팩토링   

<br>

#### 함수 

- `REST Client`라는 vscode 툴을 이용해서 브라우저 개발자 도구의 network말고, 에디터 상에서 json 파일을 볼 수 있게 한다.   
    - *.http 라는 파일에  `GET [api 주소] HTTP/1.1` 코드로 불러올 수 있다.   

<br>


- `type` 유형의 중복된 코드를 제거하는 편이 가독성 측면에서 좋다.   
    - 공통된 요소들을 하나의 대표 type에 묶어서 정리한다.   
    - 이후, 인터섹션 알리아스를 이용해서 다른 type에 공통된 type을 넣어준다.   

    ```js
    // 공통된 요소를 담은 type News
    type News = {
        id: number;
        time_ago: string;
        title: string;
        url: string;
        user: string;
        content: string;
    }


    // & 를 이용해서 개별 type에 공통 type을 넣은 모습

    type NewsFeed = News & {
        comments_count: number;
        points: number;
        read?: boolean;
    }


    type NewsDetail = News & {
        comments: NewsComment[];
    }


    ```   

<br>

- `getData` 함수의 반환값을 처리한다.   
    - `getData` 의 함수의 리턴값은 NewsFeed(뉴스 목록) 이거나 NewsDetail(뉴스 상세 내용) 이다.    
    - 어떤 리턴값을 뱉을지 혼란스러울 수 있다.(**타입 가드**로 해결하기 어려움)         
    - 따라서 `제네릭` 문법을 이용해서 받아온 인자를 확인하고, 그에 맞는 리턴값을 뱉는다.   

    ```js
    // getData 함수의 제네릭 사용모습.
    function getData<AjaxResponse>(url: string): AjaxResponse {
        ajax.open('GET', url, false);
        ajax.send();

        return JSON.parse(ajax.response);
    }


    // getData 함수를 호출하는 부분의 제네릭 문법
    newsFeed = store.feeds = makeFeeds(getData<NewsFeed[]>(NEWS_URL)); // NewsFeed[] 임을 알려준다.
    ```

<br>

**그 외의 중복되는 변수를 제거하고, 공통된 변수로 바꿔준다.**   
