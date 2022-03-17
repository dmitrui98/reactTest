import React, {useMemo, useState} from 'react';
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/ui/modal/MyModal";
import MyButton from "./components/ui/button/MyButton";
import {usePosts} from "./hooks/usePosts";

function App() {
    const [posts, setPosts] = useState([
        {id : 1, title: 'Яs script', body : '1escription1'},
        {id : 2, title: 'Ыavascript', body : '2escription2'},
        {id : 3, title: 'Аscript123', body : '3escription3'},
        {id : 4, title: 'Бscript123', body : '2escription3'},
        ]
    );
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modalVisible, setModalVisible] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModalVisible(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    };

  return (
    <div className='App'>

        <MyButton
            style={{marginTop: 15}}
            onClick={() => setModalVisible(true)}
        >
            Создать пост
        </MyButton>

        <MyModal visible = {modalVisible} setVisible={setModalVisible}>
            <PostForm create={createPost}/>
        </MyModal>

        <hr style={{margin: '15px 0'}}/>

        <PostFilter
            filter = {filter}
            setFilter = {setFilter}
        />

        <PostList
            remove = {removePost}
            posts = {sortedAndSearchedPosts}
            title = 'Список постов'
        />
        {/*<br/>*/}
        {/*<br/>*/}
        {/*<br/>*/}
        {/*<ClassCounter/>*/}
        {/*<Counter/>*/}
        {/*<InputHook/>*/}
    </div>
  );
}

export default App;