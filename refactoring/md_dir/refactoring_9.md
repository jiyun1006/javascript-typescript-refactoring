>### 아홉 번째 리팩토링   

<br>

#### XHR, ajax 비동기 처리(콜백 함수)       

- `콜백함수`를 통한 비동기 처리를 통해서 특정 이벤트 처리를 맡긴다.   
  (비동기적 테크닉 : 싱글스레드의 블록킹을 방지해서 논블록킹으로 동작하게 한다.)   


- 클래스 `Api`에서 getRequest에 콜백함수를 인자로 줘서 JSON 자료를 콜백함수에게 넘겨준다.   

    - 또한 `Api`를 상속받는 `NewsFeedApi`와 `NewsDetailApi`의 getData 메서드도 인자에 콜백함수를 넣는다.   
      (`NewsFeedApi`와 `NewsDetailApi`는 콜백함수를 받을 대상이 아니다.)      

    ```js
    //Api 클래스
    export default class Api {

        //'''생략'''

        // ajax 요청을 건네줄 때의 처리를 비동기식으로 했다.  
        // cb(콜백함수)를 이용함.
        getRequest<AjaxResponse>(cb: (data: AjaxResponse) => void): void { 
            this.ajax.open('GET', this.url);
            this.ajax.addEventListener('load', () => {
                cb(JSON.parse(this.ajax.response) as AjaxResponse);
            })
            this.ajax.send();
        }
    }

    //NewsFeedApi 클래스
    export class NewsFeedApi extends Api {
        constructor(url: string) {
            super(url);
        }

        getData(cb: (data: NewsFeed[]) => void): void {
            return this.getRequest<NewsFeed[]>(cb);
        }
    }

    ```   

<br>

- 콜백함수는 View단에서 받아야 하므로, `NewsFeedView`와 `NewsDetailView`를 고쳐야한다.    
  (기존의 getData는 인자없이 반환값이 있었지만, 지금의 getData는 콜백함수를 인자로 주고, 반환값이 없다.)    


```js
export default class NewsFeedView extends View {
  
  // '''생략'''

  render = (page: string = '1'): void => {
    this.store.currentPage = Number(page);

    if (!this.store.hasFeeds) {
      this.api.getData((feeds: NewsFeed[]) => {

        // JSON을 담고있는 feeds를 이용해서 store를 설정하는 코드
        this.store.setFeeds(feeds);
        this.renderView();
      })
    }

    this.renderView();
  }

  renderView = () => {

      //'''생략'''
  }
```    

**콜백함수를 통해 비동기 처리를 할 수 있다. 지금의 구조에서는 콜백의 콜백정도이므로 깊다고 할 수 없지만,**   
**이중 삼중, 더 깊게 들어가면, 처리하기가 상당히 복잡하고 어려워지기 때문에, `Promise`를 이용한다.**   

<br>
<br>


#### Promise   

- `XMLHttpRequest`의 단점을 보완해서 나온 api인 `fetch`를 사용한다.   

- `Promise` 객체가 제공하는 then이라는 메서드를 이용해서 비동기함수들을 연결해서 붙일 수 있다.   
  (이를 통해서 *콜백헬* 이라고 불리는 중첩 구조를 해결할 수 있다.)   

  - *JSON.pares()는 동기적 방식이기 때문에, 데이터가 많으면, 페이지가 멈추는 현상이 생긴다.*    
     

```js
// getRequest를 변형한 형태.
getRequestWithPromise<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
        fetch(this.url)
        // then 메서드를 이용해서 하나의 깊이로 비동기 함수를 연결했다.
            .then(response => response.json())  // JSON.parse()를 변형. 
            .then(cb)
            .catch(() => {
                console.log("데이터를 불러오지 못했습니다.")
            })
    }
```


