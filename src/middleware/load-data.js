import { useEffect, useState } from "react";

export const LoadBillboards = () => {
    const [billboards, setBillboards] = useState([]);
    useEffect(() => {
        fetch('https://billboardad.herokuapp.com/billboards')
            .then(res => res.json())
            .then(data => setBillboards(data))
    }, []);

    return billboards;
}

export const LoadUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://billboardad.herokuapp.com/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);

    return users;
}

export const LoadPages = () => {
    const [pages, setPages] = useState([]);
    useEffect(() => {
        fetch('https://billboardad.herokuapp.com/pages')
            .then(res => res.json())
            .then(data => setPages(data))
    }, []);

    return pages;
}

export const LoadPage = (id) => {
    const [page, setPage] = useState({});
    useEffect(() => {
        fetch(`https://billboardad.herokuapp.com/pages/${id}`)
            .then(res => res.json())
            .then(data => setPage(data))
    }, [id]);

    return page
}

export const LoadSections = (id) => {
    const [sections, setSections] = useState([]);
    useEffect(() => {
        fetch(`https://billboardad.herokuapp.com/pages/sections/${id}`)
            .then(res => res.json())
            .then(data => setSections(data))
    }, [id]);

    return sections;
}