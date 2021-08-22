> ### 자바스크립트 타입스크립트로 리팩토링 


--------------


### javascript로 완성된 앱 (hacker_news의 api를 이용한 뉴스 앱)   

<br>

- 초기 디렉토리   

```
|-- hacker_news
        |-- app.js
        |-- index.html
```

- app.js에 모든 함수를 다 몰아넣은 형식.   

- `newsFeed`, `newsDetail` 함수와 같이 뉴스목록, 자세한 내용을 출력하는 함수를 포함하고 있다.   


- javascript만을 이용해서 만들었으며, `handlebars` 템플릿 라이브러리를 사용하여, ui를 작성했다.   
