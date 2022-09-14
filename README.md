# react-native boilerplate

현업에서 react-native를 사용한 경험을 담은 boilerplate로, 
프로젝트 구조, 사용한 프레임워크 및 라이브러리 사용 이유,  장단점을 다룬 repository입니다

------------

#### react-native를 선택한 이유

react 개발자로 입사해, mobile application 개발을 담당하게 되었고, android 뿐 아니라 ios 개발도 동시에 진행했어야 했기에 사용하게 되었습니다

[React Native](https://reactnative.dev)란?

     1. iOS 및 Android에 React 의 선언적 UI 프레임워크를 제공합니다. 
     2. React Native를 사용하면 기본 UI 컨트롤을 사용하고 기본 플랫폼에 대한 전체 액세스 권한을 갖습니다.

------------

#### 프로젝트 실행

android studio emulator, xcode ximulator 설정 후, 

- android
  - yarn android (.env)
  - apk build: yarn android:apk 
  - aab build: yarn android:aab
- ios
  - yarn ios


------------

#### 프로젝트 생성

React-native-cli (with Typescript)

expo로 빌드하는 것보다, react-native-cli를 이용하여 직접 설정 해보고, 네이티브 단에서 필요한 개발이 있을 수도 있다고 판단해 선택하였습니다

안전하고, 협업 시 수월한 개발을 위하여 typescript로 함께 설정하였습니다


------------

#### 프로젝트 구조

```bash
💼src
├── 📂api
│   ├── 📃index.ts // axios interceptor 설정
│   ├── ...
├── 📂app
│   ├── 📃store.ts // redux store 설정
├── 📂assets
│   ├── 📂images
│   │   ├── ...
├── 📂common
│   ├── 📃common.ts // 공통으로 사용되는 utils
├── 📂components
│   ├── 📂atoms // 원자 단위의 컴포넌트
│   │   ├── ...
│   ├── 📂orgainsms // atoms 혼합 컴포넌트
│   │   ├── ...
│   ├── 📂styles // 공통 css style
│   │   ├── ...
│   │   ├── 📃Mixin.ts // 공통 styled-compoent
│   │   ├── 📃theme.ts // 공통 css color, fontSize
├── 📂features
│   ├── ...
│   ├── 📂navigations
│   │   ├── ...
│   │   ├── 📂navigators // 각 tab features 모음
│   │   ├── 📃index.tsx 
│   │   ├── 📃RootTab.tsx // auth에 따른 tab stack 구분
│   │   ├── 📃BottomTab.tsx // bottom tab menu 모음
│   │   ├── ...
├── 📂reducers // redux reducer slice
│   ├── ...
├── 📃App.tsx
├── 📃.env // local test env
├── 📃.env.dev // dev server env
├── 📃.env.prod // prod server env 
``` 