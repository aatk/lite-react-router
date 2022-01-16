# lite-react-router
Роутер с совместимостью с react-router-dom с реализацией через lite-react-statemanager

## `<Router>` 
По аналогии с компонентом Router в react-router-dom

оберните весь код который требуется перерендеривать при изменении страницы

```javascript
return (
    <Router>
        <div className="App">
            <header className="App-header">
                <Routes>
                    <Route exact path={"/"} component={Page1} />
                    ...
                    <Route component={ErrorPage} />
                </Routes>
            </header>
            <footer>footer</footer>
        </div>
    </Router>);
```

## `<Routes>` аналог Switch
По аналогии с компонентом Routes(v6) или Switch в react-router-dom

Блок который содержит в себе только теги `<Route>` поддерживается также React.Fragment `<></>` и массивы `Array`

```javascript
    <Routes>
        <Route ... />
        <Route ... />
        {Array}
        <>{ArrayInFragment}</>
        <Route component={ErrorPage} />
    </Routes>
``` 

## `<Route>`
По аналогии с компонентом Route в react-router-dom

Описание роутов по которым будет рендерится страница.
Компонент ищет из Route подходящий и рендерит только его содержимое

ВНИМАНИЕ!!! При использовании данных роутов крайне рекомендуется производить отписки в `componentWillUnmount` от любых событий в компонентах иначе можно получить ошибку рендинга компонент.

Поддерживаются пропы:
* `exact` - точное совпадение пути в роуте `path` с текущей страницей
* `path` - путь который анализируется, поддерживаются замены `:ТексПараметра`, `*`. Первый выберет данный парамер из URL и он будет доступен для дальнейшего анализа, второй просто пропускает любые значения в URL после его указания
* `component` - для передачи компоненты для рендеринга
* `render` - позволяет передать функцию в которую компонент передаст пропы `(props) => { <div {...props}> }`

Если в компонент не передать параметры `component` или `render`, будет отрендерено содержимое тега `<Route ...>Это будет отрендерено</Route>`

#### Примеры использования:
```javascript
    <Route exact path={"/"} component={Page1} />
    <Route path={"/page1/:id"} component={Page2}>/page1/:id</Route>
    <Route path={"/page2/:id"} component={Page2}>/page2/:id</Route>
    <Route path={"/page2/:id/:second"} component={Page2}>/page2/:id/:second</Route>
    <Route path={"/page3"} >Content in route tag</Route>
    <Route path={"/page4/*"} render={(props) => (<Page2 {...props}/>)}/>
```

## `<Link>`
По аналогии с компонентом Link в react-router-dom

Создает элемент с тегом `<a>` по нажатию на котором происходит переход по страницам

Поддерживаются пропы:
* `to` - ссылка для перехода, по аналогии с аттрибутом href в теге `<a>`
* `className` - описание CSS классов по умолчанию
* `blank` - говорит компоненте, что ссылку требуется открыть в новом окне
* `hard` - говорит компоненте, что ссылку требуется открыть в текущем окне с перезагрузкой страницы

#### Использование:
##### Простая перезагрузка страницы (ререндеринг)
```javascript
<Link to={"/page2"} className={"css_a"}>Текст ссылки</Link>
```
Сформирует:
```javascript
<a href="/page2" className="css_a">Текст ссылки</a>
```

##### Жесткая перезагрузка страницы (перезагрузка)
При нажатии будет перезагружать страницу целиком
```javascript
<Link to={"/page2"} className={"css_a"} hard>Текст ссылки</Link>
```
Сформирует:
```javascript
<a href="/page2" className="css_a">Текст ссылки</a>
```

##### Открытие в новом окне
При нажатии откроет страницу в новом окне(вкладке)
```javascript
<Link to={"/page2"} className={"css_a"} blank>Текст ссылки</Link>
```
Сформирует (аналог):
```javascript
<a href="/page2" className="css_a" target="_blank">Текст ссылки</a>
```

## `<NavLink>`
По аналогии с компонентом NavLink в react-router-dom

Полностью аналогичен компоненте Link, за единственным исключением:
если текущая страница и ссылка в пропе `to` идентичные добавляет к CSS классу содержимое пропа `activeClassName`

Поддерживаются пропы (сверх пропов Link):
* `activeClassName` - стиль CSS класса который будет применен если текущая страница и ссылка в 'to' совпадают 

## setNavigate(url, hardReload = false)
Функция, аналог хука useNavigate в react-router-dom

Позволяет переходить из javascript функций на роуты

Параметры: 
* `url` - URL по которому требуется перейти
* `hardReload` - признак перезагрузки страницы (`true` - перезагружать страницу)

### Использование:
```javascript
import {setNavigate} from "lite-react-router"
...
<button onClick={()=>setNavigate("/")}>goto page1</button>
...
link = () => {
    setNavigate("/page2");
}
<button onClick={this.link}>Button to /page2 - error route</button>
```

## getParams()
Функция, аналог хука useParams в react-router-dom

Позволяет получить разобранные параметры из URL'а в случае если по ним требуется проводить какой-то анализ 

### Использование:
```javascript
    URL - http://localhost:3000/page2/111/222/333
    Route (path) - /page2/:param1/:param2/:param3

    ...
    let urlParams = getParams();
    if (urlParams !== undefined) {
        if (urlParams.length > 0) {
            console.log(urlParams);
        }
    }
    ...

    Console:
    ["111", "222", "333"]
```

Пример использования компоненты в папке `src` данного компонента
