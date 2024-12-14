import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { IonPage, IonContent, IonSearchbar, IonSegment, IonSegmentButton, IonLabel, IonButton, } from "@ionic/react";
import ForumCard from "./ForumCard";
import "./Forum.css";
const Forum = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([
        {
            id: 1,
            title: "Seberapa sering harus ganti air hidroponik?",
            category: "Kebun Hidroponik",
            views: 28,
            comments: [{ id: 1, text: "Sangat menarik!" }],
            image: "/path/to/avatar1.jpg",
            user: "Alifa",
            date: "06-12-2024",
        },
        {
            id: 2,
            title: "Hama kebun yang paling menjengkelkan!",
            category: "Hama & Pestisida",
            views: 40,
            comments: [{ id: 1, text: "Bagaimana mengatasi ulat?" }],
            image: "/path/to/avatar2.jpg",
            user: "Reza",
            date: "04-12-2024",
        },
        {
            id: 3,
            title: "Kompos bikin tanaman subur banget!",
            category: "Komposting untuk Pemula",
            views: 31,
            comments: [{ id: 1, text: "Bagaimana membuat kompos di rumah?" }],
            image: "/path/to/avatar3.jpg",
            user: "Aurel",
            date: "30-11-2024",
        },
        {
            id: 4,
            title: "Rahasia menanam pangan sendiri dengan hasil maksimal",
            category: "Menanam Pangan Sendiri",
            views: 7,
            comments: [{ id: 4, text: "Sangat menarik!" }],
            image: "/path/to/avatar1.jpg",
            user: "Intan",
            date: "29-11-2024",
        },
        {
            id: 5,
            title: "Tips memilih tanaman hias untuk ruangan kecil",
            category: "Tanaman Hias Dalam Ruangan",
            views: 5,
            comments: [{ id: 5, text: "Sangat menarik!" }],
            image: "/path/to/avatar1.jpg",
            user: "Nanda",
            date: "26-11-2024",
        },
    ]);
    const myPosts = [
        {
            id: 6,
            title: "Panduan menanam sayuran di pekarangan rumah",
            category: "Menanam Sayuran",
            views: 12,
            comments: [{ id: 1, text: "Berguna banget!" }],
            image: "/path/to/avatar4.jpg",
            user: "Anda",
            date: "05-12-2024",
        },
        {
            id: 7,
            title: "Tips memilih pupuk organik terbaik",
            category: "Pupuk & Nutrisi Tanaman",
            views: 18,
            comments: [{ id: 1, text: "Penting untuk diketahui!" }],
            image: "/path/to/avatar5.jpg",
            user: "Anda",
            date: "07-12-2024",
        },
    ];
    const handleNewPost = (title) => {
        const newPost = {
            id: allPosts.length + 1,
            title,
            category: "Kategori Baru", // Default kategori bisa disesuaikan
            views: 0,
            comments: [],
            image: "/path/to/default.jpg",
            user: "Anda",
            date: new Date().toLocaleDateString("id-ID"),
        };
        setAllPosts([newPost, ...allPosts]);
    };
    useEffect(() => {
        const filterPosts = () => {
            let posts = [];
            if (activeTab === "all") {
                posts = allPosts;
            }
            else if (activeTab === "mine") {
                posts = myPosts;
            }
            if (searchQuery.trim() !== "") {
                posts = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
            }
            setFilteredPosts(posts);
        };
        filterPosts();
    }, [activeTab, searchQuery, allPosts]);
    return (_jsx(IonPage, { children: _jsx(IonContent, { children: _jsxs("div", { className: "forum-container", children: [_jsx(IonSearchbar, { value: searchQuery, onIonInput: (e) => setSearchQuery(e.detail.value), placeholder: "Cari...", className: "searchbar-custom", showClearButton: "focus", debounce: 500 }), _jsxs(IonSegment, { value: activeTab, onIonChange: (e) => setActiveTab(e.detail.value?.toString() ?? "all"), className: "segment-custom", children: [_jsx(IonSegmentButton, { value: "all", children: _jsx(IonLabel, { children: "Semua Unggahan" }) }), _jsx(IonSegmentButton, { value: "mine", children: _jsx(IonLabel, { children: "Unggahan Saya" }) })] }), _jsx("div", { className: "create-button-container", children: _jsx(IonButton, { className: "create-button", onClick: () => {
                                const newPostTitle = prompt("Masukkan judul postingan baru:");
                                if (newPostTitle) {
                                    handleNewPost(newPostTitle);
                                    alert("Unggahan berhasil dibuat!");
                                }
                            }, color: "success", children: "Buat Unggahan Baru" }) }), _jsx("div", { className: "forum-posts", children: filteredPosts.length > 0 ? (filteredPosts.map((post) => (_jsx(ForumCard, { post: post }, post.id)))) : (_jsx("p", { className: "text-center text-gray-500 mt-6", children: "Tidak ada postingan yang ditemukan." })) })] }) }) }));
};
export default Forum;
