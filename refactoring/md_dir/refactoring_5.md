>### 다섯 번째 리팩토링   

<br>

#### Class   

- NewsFeedApi와 NewsDetailApi를 한 곳의 class로 만든다.   
    - Api 라는 class 명을 가진 객체를 만들고, 생성자를 통해 변수를 할당한다.   

    ```js
    class Api {
        url: string; // 내부에 저장하는 용도
        ajax: XMLHttpRequest;

        constructor(url: string) {
            this.url = url // this로 내부 url에 접근해서 받은 url을 할당한다.
            this.ajax = new XMLHttpRequest();
        }
    }

    ```   
    <br>

    - `getData` 함수는 두 Api 모두 사용하므로, 상위 클래스인 Api에 넣어준다.   

    ```js
    class Api {


        //''' 생략 '''


        getRequest<AjaxResponse>(): AjaxResponse { // getData 함수를 옮겨옴.
        this.ajax.open('GET', this.url, false);
        this.ajax.send();
    
        return JSON.parse(ajax.response);
        }
    }
    ```

    <br>

    - 각각의 NewsFeed, NewsDetail 함수에서 api를 호출해서 알맞은 요청을 보낼 수 있게 된다.   
      (지금 당장은 크게 가독성 측면에서의 향상은 미미하다.)   

      ```js
      function newsFeed(): void {
        
        // '''생략'''

        const api = new NewsFeedApi(NEWS_URL);
        if (newsFeed.length === 0) {
            newsFeed = store.feeds = makeFeeds(api.getData()); // 생성된 api 변수를 통해 더 깔끔하게 getData 함수 호출.
        }
      }


      // '''생략'''
      ```
    - **Api 클래스의 하위 클래스에서 getRequest를 호출하기 위해 getData를 사용하고 있다.**   
      **하지만, 지시어를 사용하지 않는다면, 바깥에서도 사용하게 되버린다.**   
      **따라서, protected 지시어를 통해서 하위 클래스의 인스턴스가 사용하지 못하게 막는다.**   

      ```js
      // 현재 Api 클래스의 모습

      class Api {
        url: string; // 내부에 저장하는 용도
        ajax: XMLHttpRequest;

        constructor(url: string) {
            this.url = url // this로 내부 url에 접근해서 받은 url을 할당한다.
            this.ajax = new XMLHttpRequest();
        }


        protected getRequest<AjaxResponse>(): AjaxResponse {  // protected를 이용해서 하위 클래스의 인스턴스가 사용하지 못하게 막는다.
            this.ajax.open('GET', this.url, false);
            this.ajax.send();
        
            return JSON.parse(this.ajax.response);
            }
        }
        ``` 
 <br>

- `Mixin`을 이용해서 필요한 경우마다 class를 합성한다. (extends 와 같이 명시적으로 표기하지 않는다.)      
  (클래스간의 상하위 관계가 드러나지 않는다.)    

  - `Minin`을 이용하는 코드 (오브젝트와 프로토타입에 대한 공부 필요)   

  ```js
  function applyApiMixins(targetClass: any, baseClasses: any[]): void {
    baseClasses.forEach(baseClass => { // 다중 상속이 가능하므로, 배열로 받아와서 하나씩 순회한다.
    
    // getOwnPropertyNames() 메서드를 이용해서 객체의 모든 속성을 순회한다. (name을 인자로)
        Object.getOwnPropertyNames(baseClass.prototype).forEach(name => { 

        // getOwnPropertyDescriptor() 메서드를 이용해서 객체의 특정 프로퍼티에 대한 configurable, eumerable, value, writable 등의 명세를 반환한다.
        const descriptor = Object.getOwnPropertyDescriptor(baseClass.prototype, name);
        if (descriptor) {
            // descriptor을 이용해서 targetClass 에 주입한다.
            Object.defineProperty(targetClass.prototype, name, descriptor);
                }
            });
        });
    }

  ```   

  - Mixin으로 상속관계를 만들 경우 타입스크립트 컴파일러한테 두 클래스의 관계를 알려줘야 한다.   
    (getRequest 라는 porperty를 사용하지 못한다.)   

    ```js
    class NewsFeedApi {
        getData(): NewsFeed[] {
            return this.getRequest<NewsFeed[]>(NEWS_URL); // 상위 클래스인 Api의 getRequest를 쓰고 있는 모습.
        }
    }


    // interface를 이용해서 두 클래스간의 상속관계를 인식시킨다. 
    interface NewsFeedApi extends Api {};
    ```
  <br>
  
  **하지만, 위의 경우와 같이 명시적인 구문을 없애려고 mixin을 썼지만, 또다시 interface extends로 표현하게 되므로, 가독성 측면에서 아이러니할 수 있다.**   

  **`Mixin`은 단순히 명시하는 것보다 코드를 더욱 복잡하게 할 수 있지만, 다중 상속을 할 수 있는 장점이 있고, 코드를 더욱 독립적으로 볼 수 있다.(유연한 대처 가능)**           




