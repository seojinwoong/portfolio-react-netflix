# 넷플릭스 클론코딩 프로젝트
#### TMDB API를 활용하여 react로 넷플릭스 홈페이지를 클론코딩 해보았습니다.
[프로젝트 보러가기](http://portfolio-react-netflix.s3-website.ap-northeast-2.amazonaws.com/)

![netflixmovie](https://user-images.githubusercontent.com/42455534/196230938-b4fd85c8-c6ad-4302-a816-01d525096a61.gif)


## 구조 요약
  #### 🔳 Component
  
    • MainPage.js => 메인페이지. 최신영화정보와 장르별로 영화리스트 swiper로 구성.
    • SearchPage.js => 영화검색페이지. 검색어와 매칭되는 영화정보 리스트로 보여주는 페이지
    • MovieModal.js => 영화상세정보모달 컴포넌트. 
  
  #### 🔳 custom hook
  
    • useDebounce.js => 영화검색 기능 중 debounce방식을 custom hook으로 구성하여 작성했습니다.
 
 ## 기능 소개
  #### 1. useDebounce 방식을 이용하여 불필요한 API 요청 방지하기.
  상단 네비게이션 바에 영화 검색 INPUT창이 있습니다. input onChange이벤트를 할 때마다 API요청을 
  하게 되는데, 사용자가 검색어를 계속 입력하는 과정 중에는 굳이 API요청을 보낼 필요가 없습니다.
  특정시간이 지난 후 하나의 이벤트만 실행하는 debounce방식을 활용하였고 이 방식을 custom hook으로 작성하였습니다.
  
  
  
  
  
  
 
  
