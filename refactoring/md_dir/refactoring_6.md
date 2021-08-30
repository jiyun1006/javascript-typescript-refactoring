>### 여섯 번째 리팩토링   

<br>

#### View 클래스(구조 개선)   


**이전에 mixin 했던 버전이 아닌 extends 버전으로 리팩토링을 시작**    

<br>

- 함수로 작성되어 있는 `NewsFeed`, `NewsDetail`를 클래스로 변환시킨다.   
    - 이후, 반복적으로 사용될 필요없는 즉, 요청을 보낼 때마다 실행돼서는 안되는 부분을 따로 클래스안의 메서드로 만든다.(render, makeFeeds, makeComment 메서드)     
    
<br>

- 각각 `NewsFeedView`, `NewsDeatilView` 클래스로 옮긴다음, 공통된 요소를 상위 클래스 `View`에 옮긴다.      
    - 상위 클래스 `View`로 부터 상속을 받고, 상위 클래스의 생성자를 호출한다.   
    ```js
    

    class NewsFeedView extends View {
        constructor(containerId: string) {
            let template = 
             // '''생략'''
            super(containerId, template); // View 클래스의 생성자를 명시해준다.   


        // '''생략'''
    }
    ```     

    - 이후, 생성자로 생성된 변수로 바꾸는 작업과 공통으로 쓰이는 메서드를 상위 `View`클래스에 만든다.(updateView, addHtml, getHtml)

    - template 부분에서 `this.feeds[i].xxx` 와 같은 구문이 반복 등장하고 있다.    
      (**구조분해 할당**을 이용해서 가독성을 늘린다.)    

    ```js
    // this.feeds[i] 객체에 담긴 속성을 개별 변수에 담아서 간단히 사용하게 한다.   
    const {id, title, comments_count, user, points, time_ago, read } = this.feeds[i];

    ```    

<br>

- `Router` 클래스    
    - 첫 페이지와 hash가 변경될 때마다 페이지가 변경되어야 한다.   
    - 먼저 `RouteInfo` 인터페이스를 만들어서 클래스 안의 변수 타입을 지정한다.   
    ```js
    interface RouteInfo {
        path: string;
        page: View;
    }
    ```    
    - 첫 페이지는 hash가 없으므로, `defaultRoute : RouteInfo | null` 와 같이 선언한다.   
    
    - 또한, `Router`안에서 render 메서드를 호출하고 있는데, 이는 `View`클래스의 하위 클래스에서 구현한 메서드이다.   
      때문에 View클래스를 abstract 클래스로 바꾸고, render 메서드를 추상 메서드로 만들어야 한다.   

      ```js
        abstract class View {
            // '''생략'''
        
            abstract render(): void; // 추상메서드로 설정한 모습.
        }
      ```   

    - `Router` 전체 코드   

    ```js
    class Router {
        routeTable: RouteInfo[];
        defaultRoute: RouteInfo | null;
        constructor() {
            this.routeTable = [];
            this.defaultRoute = null;
            // bind를 이용해서 Router의 인스턴스임을 인식시킨다.
            // bind시키지 않으면, 다른 메서드(setDefaultPage, addRouterPath....)에 접근을 할 수 없다.
            window.addEventListener('hashchange', this.route.bind(this));

        }
        setDefaultPage(page: View): void{
            this.defaultRoute = { path: '', page};
        }

        addRoutePath(path: string, page: View): void{
            this.routeTable.push({ path, page});
        }
        route(){
            const routePath = location.hash;

            if(routePath === '' && this.defaultRoute){
            this.defaultRoute.page.render();
            }

            for (const routeInfo of this.routeTable){ // for문과 달리 더 깔끔하다.
            if(routePath.indexOf(routeInfo.path) >= 0){ // routePath안에 routeInfo.path가 들어있는지 확인.
                routeInfo.page.render();
                break;
            }
            }
        }

    }
    ```    

- 접근 제어    
    - 모든 클래스가 완성되었으니, 외부에서의 접근에 대한 적절한 접근 제어 상태를 만들어야 한다.   

    - **default 설정으로 다른 지시어를 설정하지 않으면, `public`으로 설정되어 외부에서의 접근이 가능하게 된다.**   
      **따라서 외부의 접근없이 자식클래스에게 허용하려면 `protected`, 자식 클래스에게도 허용하지 않으면 `private`으로 지시어를 설정한다.**

    - ex) `View` 클래스   

    ```js
    abstract class View {
        private template: string;  // 외부에서 접근할 필요가 없는 속성이기에 private으로 설정했다.
        private renderTemplate: string;
        private container: HTMLElement;
        private  htmlList: string[];

       // ''' 생략 '''

        protected updateView(): void {  // updateView는 자식 클래스에서 사용하기 때문에, protected로 설정했다.
            this.container.innerHTML = this.renderTemplate;
            this.renderTemplate = this.template;
        }

        // ''' 생략 '''

        private clearHtmlList(): void {  // 메서드 중 clearHtmlList는 View에서의 쓰임만 있기에, private으로 설정했다.
            this.htmlList = [];
        }
        
        // ''' 생략 '''
    }
    ```







      
    


