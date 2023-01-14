import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { updateProfile, userProfileAction } from "./usersSlice";
import URL from '../utils/URL'
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";

//Create
export const createpostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    // console.log(post);
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const postData = { ...post };
      // console.log("from redx " + formData);
      const { data } = await axios.post(`${origin}/api/posts`, postData, config);
  
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all posts
export const fetchPostsAction = createAsyncThunk(
  "post/list",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try
    {
      let link = `/api/posts`;
      const { data } = await axios.get(link,{ 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    });
      console.log("#2 got the data",data)
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Add Likes to post
export const postAction = createAsyncThunk(
  "post/action",
  async ({type,profile,id,user}, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const Loggedinuser = process.browser &&  getState()?.users;
    const { userAuth } = Loggedinuser;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      let link = `/api/posts/${type === 'like' ? "like" : "dislike" }`
      const { data } = await axios.put(
        link,
        { id },
        config
      );
      profile && dispatch(updateProfile(user))
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// comments 
export const createCommentAction = createAsyncThunk(
  "post/comment/create",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${origin}/api/comments`,
        {
          description: comment?.commentData?.description,
          postId: comment?.commentData?.postId,
        },
        config
      );
      comment?.profile && dispatch(updateProfile(comment.user))

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete
export const getCommentsAction = createAsyncThunk(
  "post/comment/all",
  async ({url}, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try
    {
      
      // let link = postId
      //   ? `${origin}/api/comments?post=${postId}`
      //   : `${origin}/api/comments`

      let link = `${URL}/api/comments`;
      const { data } = await axios.get(link, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//slice
const postSlice = createSlice({
  name: "post",
  initialState: {
    postLists: [],
    comments:[],
    actionLoading:false,
    serverErr: null,
    isCreated: false,
    isUpdated: false,
    profileLoading:false,
  },
  reducers: {
    reset: (state) => {
      state.appErr = null;
      state.serverErr = null;
      state.isCreated = false;
    },
    getAllPosts: (state,action) => {
      state.postLists = action?.payload;
    },
    testo: (state,action) => {
      state.testo = action?.payload;
    }
    
  },
  extraReducers: (builder) => {
    
    builder.addCase(createpostAction.pending, (state, action) => {
      state.createPostLoading = true;
    });
    builder.addCase(createpostAction.fulfilled, (state, action) => {
      state.postLists = [...state.postLists, action.payload.post].sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)
      state.createPostLoading = false;
      state.isCreated = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(createpostAction.rejected, (state, action) => {
      state.createPostLoading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch posts
    builder.addCase(fetchPostsAction.pending, (state, action) =>
    {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) =>
    {
      console.log("fetchFul",action.payload)
      state.postLists = action?.payload.posts;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) =>
    {
      console.log("fetchErr",action.error.message)
      state.loading = false;
      state.appErr = null;
      state.serverErr = action?.error?.message;
    });

    //Likes
    builder.addCase(postAction.pending, (state, action) => {
      state.actionLoading = true;
    });
    builder.addCase(postAction.fulfilled, (state, action) => {
      const updatedPosts = state?.postLists?.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.postLists = updatedPosts;
      state.actionLoading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(postAction.rejected, (state, action) => {
      state.actionLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // comments 
    // create
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.createCommentLoading = true;
    });
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      // const data = state.comments.push(action.payload.comment);
      
      // state.comments = [...state.comments, action.payload.comment].sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)
      const updatedPosts = state?.postLists?.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.createCommentLoading = false;
      state.postLists = updatedPosts;

      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.createCommentLoading = false;
      state.commentCreated = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    builder.addCase(getCommentsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCommentsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(getCommentsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
  },
});

export const { reset,getAllPosts,testo } = postSlice.actions;

export default postSlice.reducer;