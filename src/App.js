import React, {useState, useEffect} from 'react';
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/ui/modal/MyModal";
import MyButton from "./components/ui/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./api/PostService";
import Loader from "./components/ui/loader/Loader";

function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modalVisible, setModalVisible] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [isPostLoading, setIsPostLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModalVisible(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    };

    async function fetchPosts() {
        setIsPostLoading(true);
        setTimeout(async () => {
            const posts = await PostService.getAll();
            setPosts(posts);
            setIsPostLoading(false);
        }, 1000);

    }

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

        {
            isPostLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                    <Loader/>
                </div>
                : <PostList
                    remove = {removePost}
                    posts = {sortedAndSearchedPosts}
                    title = 'Список постов'
                />
        }

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