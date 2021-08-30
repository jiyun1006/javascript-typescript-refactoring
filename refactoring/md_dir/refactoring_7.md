>### 다섯 번째 리팩토링   

<br>

#### 디렉토리 분리   

```
|-- hacker_news
        |-- src
            |-- src
                |-- core
                    |-- api.ts
                    |-- router.ts
                    |-- view.ts
                |-- page
                    |-- index.ts
                    |-- news-detail-view.ts
                    |-- news-feed-view.ts
                |-- types
                    |-- index.ts
            |-- config.ts   
            |-- api.ts 
        |-- index.html
        
```   


- `app.ts`에 집중되어있던 기능들을 각각의 디렉토리에 분리한다.   
    - 이후, 모듈 스펙을 이용해서 서로를 이용가능하게 한다.(import, export)   
    ```js
    // export 를 해줄 class
    export class Api{

        //''' 생략 '''
    }

    // 다른 파일안에서 모듈로 불러올 수 있다.
    import { Api } from './api';


    // export default를 해주게 되면, import 하는 곳에서 명칭을 정할 수 있다.   

    export default class Api{

        //''' 생략 '''
    }

    // default로 export하면, 이름을 정할 수 있다.
    import Api_one from './api';
    ```   

    - 현재 page 디렉토리 안에 두개의 페이지가 있는데, 해당 페이지들이 더 늘어나게 되면, import 할 때 번거로워 진다.   
      (페이지마다 import 해줘야 하므로, 효율이 좋지 않고, 예쁘지 않다.)   
        - 따라서 page안에 `index.ts`를 따로 만들어서 페이지의 export 를 모아주는 개념으로 쓴다.(?)   

        ```js
        // index.ts이 없을 때, app.ts의 import 모습 
        import NewsFeedView from '../page/news-feed-view';
        import NewsDetailView from '../page/news-detail-view'; // 페이지가 늘어나면 계속 늘어나다. 




        // /page/index.ts 파일의 코드   
        export { default as NewsDetailView } from './news-detail-view'; 
        export { default as NewsFeedView } from './news-feed-view';
        

        // app.ts 에서 페이지들을 import 받을 때의 모습
        import { NewsDetailView, NewsFeedView } from './page';
        ```
    
