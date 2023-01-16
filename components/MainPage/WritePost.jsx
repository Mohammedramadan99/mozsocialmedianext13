import React, { useEffect, useState } from 'react'
import PanoramaIcon from '@mui/icons-material/Panorama';
// import { fetchCategoriesAction } from '../../redux/slices/category/categorySlice'
import { createpostAction, reset } from '../../store/postsSlice'
import { useDispatch, useSelector } from 'react-redux';
// import UserDetails from '../UserDetails/UserDetails';
import Image from 'next/image';
import { motion } from "framer-motion"
import {fadeInLeft} from '../../utils/animations'
import { useSession } from 'next-auth/react';

function WritePost({ dir })
{
    const dispatch = useDispatch()
    const { data: session } = useSession()
    const { userAuth, usersList } = useSelector(state => state.users)
    // const currUser = usersList?.find(u => u._id === userAuth?._id)
    const currUser = session?.user

    const { isCreated, loading } = useSelector(state => state.posts)
    // const { categoryList } = useSelector(state => state?.category)
    const [message, setMessage] = useState('')
    const [images, setImages] = useState('');
    const [description, setDescription] = useState('');
    const [imagesPreview, setImagesPreview] = useState('')
    const [formData, setFormDate] = useState({
        description: "",
        category: "",
    })
    // for checking 
    const [addImg, setAddImg] = useState(false)
    // for inputs
    const [postContent, setPostContent] = useState(null)

    const createProductSubmitHandler = (e) =>
    {
        e.preventDefault();

        if (description) {
            const data = {
                description,
                images
            }
            dispatch(createpostAction(data));
        }
    };

    const createProductImagesChange = (e) =>
    {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) =>
        {
            const reader = new FileReader();

            reader.onload = () =>
            {
                if (reader.readyState === 2)
                {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };
    const addPhotoHandler = () =>
    {
        setAddImg(!addImg)
        addImg && setImagesPreview("")
    }
    const onChange = (e) =>
    {
        setFormDate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() =>
    {
        if (isCreated)
        {
            setImagesPreview([])
            setImages([])
            setDescription("")
            dispatch(reset())
        }
    }, [isCreated])
    // useEffect(() =>
    // {
    //     if (isCreated)
    //     {
    //         setImagesPreview("")
    //         setFormDate({
    //             description: "",
    //             category: "",
    //         })
    //     }
    //     setAddImg(false)
    // }, [isCreated])

    // === "mainPage__middle" ? "mainPage__middle__writePost" : dir === "userDetails" && "userDetails__writePost"
    return (
        <motion.div variants={fadeInLeft} initial="initial" animate="animate" className={`${dir}__writePost`}>
            {/* {loading ? <p>loading ... </p> : ( */}
            <p> {message} </p>
            <>
                <div className={`${dir}__writePost__user`}>
                    <div className={`${dir}__writePost__user__img img__rounded`}>
                        {currUser?.image && <Image width={100} height={100} src={currUser?.image} alt="you" />}
                    </div>
                    <div className={`${dir}__writePost__user__name`}>
                        {dir === "userDetails" ? `${currUser?.name}` : `${currUser?.name}`}
                    </div>
                </div>
                <div className={`${dir}__writePost__top`}>
                    {addImg && (
                        <>
                            <input type="file" onChange={createProductImagesChange} />
                            {imagesPreview.length >= 1 && (
                                <div className={`${dir}__writePost__top__postImg`}>
                                    <img src={imagesPreview} alt="" />
                                </div>
                            )}

                        </>
                    )}

                    <div className={`${dir}__writePost__top__postContent`}>
                        <textarea placeholder='what do you want to say?' value={description} name="description" onChange={e =>setDescription(e.target.value)} ></textarea>
                    </div>
                </div>
                <hr />
                <div className={`${dir}__writePost__bottom`}>
                    <div className={`${dir}__writePost__bottom__postPhoto`} onClick={addPhotoHandler} >
                        <div className={`${dir}__writePost__bottom__postPhoto__icon`}>
                            <PanoramaIcon />
                        </div>
                        photo
                    </div>
                    <button className={`${dir}__writePost__bottom__btn`} style={description ? { opacity: "1" } : { opacity: ".3" }} onClick={e => createProductSubmitHandler(e)}>
                        post
                    </button>
                </div>
            </>
            {/* )} */}
        </motion.div>
    )
}

export default WritePost