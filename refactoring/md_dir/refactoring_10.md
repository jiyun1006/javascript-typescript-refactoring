>### 열 번째 리팩토링   

<br>

#### async, await   

- `async` 키워드를 이용해서, 동기식으로 쓰여진 함수를 간단하게 비동기 함수로 바꿀 수 있다.   

- 비동기 함수로 바뀌기 때문에, 반환값은 `Promise`가 되며, 반환값을 제대로 반환하기 위해서는 `then` 메서드를 써야한다.   
  (**동기식으로 비동기 함수를 쓰는건데, then 메서드까지 써가면서 쓸 필요가 있을까 ???? 라는 의문이 생긴다.**)    

- 따라서 이를 간편하게 하기 위해서, 반환값을 받기 위해서, `await` 키워드를 사용한다.    

```js
// fetch api를 이용한 비동기 방식 코드
getRequestWithPromise<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
        fetch(this.url)
        // then 메서드를 이용해서 하나의 깊이로 비동기 함수를 연결했다.
            .then(response => response.json())  // JSON.parse()를 변형. 
            .then(cb)
            .catch(() => {
                console.log("데이터를 불러오지 못했습니다.")
            })
    }


// async와 await를 이용한 비동기 코드
async request<AjaxResponse>(): Promise<AjaxResponse> { // 반환값이 Primise이다.
        // 마치 동기식 함수인 것처럼 사용할 수 있다.
        const response = await fetch(this.url)
        return await response.json() as AjaxResponse;
    }
```   
<br>

- async 비동기 함수를 호출하는 함수는 해당함수도 async 키워드를 써야한다.   

```js
// NewsFeedApi에서 request 메서드를 호출하는 모습
export class NewsFeedApi extends Api {
    constructor(url: string) {
        super(url);
    }

    async getData(): Promise<NewsFeed[]> {
        return this.request<NewsFeed[]>();
    }
}
```   

<br>

**아직 `Promise` 스펙에 대한 깊은 공부가 없는 상태이다.**    
**실제로 프로젝트에 적용하면서 알아가는 것과 동시에, 비동기 처리에 대한 공부를 하며, 비동기 방식에 빨리 익숙해져야 되겠다**