>### 첫 번째 리팩토링 (파일변환)   

- 먼저 확장자 명을 js에서 ts로 변환한다.   

- `tsconfig.json` 파일을 생성한다. (타입스크립트는 트랜스 파일러이기 때문에, 자바스크립트로 변환이 된다.)   
(이때, 변환시키려는 옵션을 지정하는 파일이다.)    

<br>

- `tsconfig.json` 파일 코드   
```js 
{
    "compilerOptions": {
        "strict": true,  
        "target": "ES5", // ES5 자바스크립트 문법을 사용한다.
        "module": "CommonJS", 
        "alwaysStrict": true,
        "noImplicitAny": true, // any라는 타입보다 명확한 타입을 사용하게 하는 옵션.
        "noImplicitThis": true,
        "sourceMap": true, // dist 디렉토리(ts파일을 변환한 파일을 보관하는 곳.)에 파일을 보관한다. 이를 통해, 브라우저에서 본래의 ts파일을 볼 수 있고, 수정을 용이하게 한다.

        "downlevelIteration": true
    }
}
```    



