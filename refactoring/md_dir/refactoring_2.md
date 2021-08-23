>### 두 번째 리팩토링   

<br>


#### 변수에 대한 타입지정    

- 자바스크립트로 작성된 파일의 변수에 타입을 지정해주는 작업을 한다.   

- DOM을 이용해서 전체 body태그를 가져오는 역할을 한 container 변수에 타입을 지정한다.   

```js
// vscode의 기능을 이용해서 반환값을 알아낸다.
(method) Document.getElementById(elementId: string): HTMLElement | null


// HTMLElement | null 이 반환값임을 알아냈으니, 변수에 지정해준다.   
const container: HTMLElement | null = document.getElementById('root');
```   

- 이 밖에도 다른 변수에도 객체 타입을 지정해준다.   

<br>

#### 객체에 대한 타입지정 

- `객체`에 대한 타입을 지정한다.(type과 interface가 있고, 여기선 type을 사용한다.)   

- NewsFeed 객체에 대한 타입 지정.(type 사용)    


**store 객체의 feeds 인스턴스의 타입을 지정하기 위한 NewsFeed**    

**api를 통해서 받아오는 데이터의 형식이 NewsFeed이므로, 재사용성이 높다.**    

```js
//tpye을 이용한 타입 지정
type Store = {
  currentPage: number;
  feeds: NewsFeed[]; // feeds에 대한 타입 지정.
}


type NewsFeed = {
  id: number;
  comments_count: number;
  url: string;
  user: string;
  time_ago: string;
  points: number;
  title: string;
  read?: boolean; // '?'의 의미는 optional 이다. 
}


// 객체 store에 타입 지정. 
const store: Store = {
  currentPage: 1,
  feeds: [],
};

```

<br>

#### 타입 가드    

- container의 반환형이 HTMLElement와 null이 있는데, 이 중 null을 받아왔을 때는 코드의 진행이 불가하다.   

- 따라서, null을 받아왔을 때와 그렇지 않을 때를 구분해야하는데,
이러한 역할을 하는 것이 `타입 가드` 코드이다.   


**container를 받아왔을 때, innerHTML이 실행되게끔 하는 타입가드 형식의 함수**
```js
function updateView(html) {
  if (container) {
    container.innerHTML = html;
  } else {
    console.error("진행하지 못합니다.");
  }
}

```

