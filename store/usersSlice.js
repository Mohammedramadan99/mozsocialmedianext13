
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URL from "../utils/URL";
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";
// const { origin } = absoluteUrl(req, req.headers.host);
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${origin}/api/auth/register`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Login
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      //make http call
      const { data } = await axios.post(`${origin}/api/auth/login`, userData);

      //save user into local storage
      // localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Profile
export const userProfileAction = createAsyncThunk(
  "user/profile",
  async ({url,id}, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState().users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try
    {
      
      let link = `${url}/api/users/profile/${id}`;
      const { data } = await axios.get(
        link, // `http://localhost:3000/api/users/profile/${id}`
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const LoggedInUserAction = createAsyncThunk(
  "user/loggedIn",
  async ({email}, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState().users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      
      let link = `/api/users/profile`;
      const {data} = await axios.post(link,{email},config)
      console.log('profileData', data)
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Follow
export const followUserAction = createAsyncThunk(
  "user/follow",
  async (follow, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${origin}/api/users/follow?profile=true`,
        { id: follow.id },
        config
      );
      // follow?.profile && dispatch(userProfileAction(userAuth?._id))
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// unFollow
export const unfollowUserAction = createAsyncThunk(
  "user/unfollow",
  async (unFollow, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${origin}/api/users/unfollow?profile=true`,
        {id:unFollow?.id},
        config
      );
      // post?.profile && dispatch(userProfileAction(userAuth?._id))
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update action
export const updateUserAction = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${origin}/api/users/profile/${userAuth._id}`,
        userData,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


//fetch User details
export const fetchUserDetailsAction = createAsyncThunk(
  "user/detail",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`${origin}/api/users/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all users
export const fetchUsersAction = createAsyncThunk(
  "user/list",
  async (num, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      let link = ''
        num
        ? (link = `/api/users?limit=${num}`)
        : (link = `/api/users`);
      const { data } = await axios.get(link, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Logout action
export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Upload cover Photo
export const uploadCoverPhototAction = createAsyncThunk(
  "user/cover-photo",
  async (coverImg, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.put(
        `${origin}/api/users/profile/uploadcoverphoto`,
        coverImg,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Upload Profile Photo
export const uploadProfilePhototAction = createAsyncThunk(
  "user/profile-photo",
  async (userImg, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser && getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      // const formData = new FormData();

      // formData.append("image", userImg?.image);
      const { data } = await axios.put(
        `${origin}/api/users/profile/profilephoto`,
        userImg,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get user from local storage and place into store
//slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth:
      process.browser && JSON.parse(localStorage.getItem("userInfo"))
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {},
    usersList: [],
    appErr: null,
    serverErr: null,
    coverPhoto: null,
    profileImgUpdated: false,
  },
  reducers: {
    reset: (state) => {
      state.appErr = null;
      state.serverErr = null;
      state.isUpdated = false;
      state.coverPhoto = null;
      state.profilePhoto = null;
      state.registered = null;
      state.profileImgUpdated = false;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(HYDRATE, (state, action) => {
    //   state = { ...state}
    // });
    // builder.addCase("persist/REHYDRATE", (state, action) => {
    //   state.userAuth =
    //     process.browser && JSON.parse(localStorage.getItem("userInfo"))
    //       ? JSON.parse(localStorage.getItem("userInfo"))
    //       : {};
    // });
    // builder.addCase(HYDRATE, (state, action) =>
    // {
    //   state.userAuth =
    //     process.browser && JSON.parse(localStorage.getItem("userInfo"))
    //       ? JSON.parse(localStorage.getItem("userInfo"))
    //       : {};
    // });
    builder.addCase("persist/REHYDRATE", (state, action) => { // very impo -- without it  only the new state of users will exist
      const data = action.payload;
      if (data) {
        return {
          ...state,
          ...data.users,
        };
      }
    });
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = true;
      state.appErr = null;
      state.serverErr = null;
      state.loggedOut = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload;
      state.serverErr = action?.error?.message;
      state.registered = false;
    })

    //user details
    builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
      state.loadingProfile = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      state.loadingProfile = false;
      state.userDetails = action?.payload;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
      state.loadingProfile = false;
      state.appErr = action?.payload;
      state.serverErr = action?.error?.message;
    });

    //All Users
    builder.addCase(fetchUsersAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.usersList = action?.payload?.users;
      state.usersCount = action?.payload.usersCount;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = null;
      state.serverErr = action?.error?.message;
    });

    //user Follow
    builder.addCase(followUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.loading = false;
      state.followed = action?.payload;
      state.unFollowed = null;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload;
      state.unFollowed = null;
      state.serverErr = action?.error?.message;
    });

    //user unFollow
    builder.addCase(unfollowUserAction.pending, (state, action) => {
      state.unfollowLoading = true;
      state.unFollowedAppErr = null;
      state.unfollowServerErr = null;
    });
    builder.addCase(unfollowUserAction.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.unfollowLoading = false;
      state.unFollowed = action?.payload;
      state.followed = null;
      state.unFollowedAppErr = null;
      state.unfollowServerErr = null;
    });
    builder.addCase(unfollowUserAction.rejected, (state, action) => {
      state.unfollowLoading = false;
      state.unFollowedAppErr = action?.payload?.message;
      state.unfollowServerErr = action?.error?.message;
    });
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload?.user;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //Profile
    builder.addCase(userProfileAction.pending, (state, action) =>
    {
      state.loadingProfile = true;
      state.profileAppErr = null;
      state.profileServerErr = null;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) =>
    {
      
      state.profile = action?.payload;
      state.loadingProfile = false;
      state.profileAppErr = null;
      state.profileServerErr = null;
    });
    builder.addCase(userProfileAction.rejected, (state, action) =>
    {
      state.profileAppErr = null;
      state.profileServerErr = null;
      state.loadingProfile = false;
    });

    //update
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action?.payload.user;
      state.isUpdated = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload;
      state.serverErr = action?.error?.message;
    });
    //Upload Profile photo
    builder.addCase(uploadCoverPhototAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(uploadCoverPhototAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.profileImgUpdated = true;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(uploadCoverPhototAction.rejected, (state, action) => {
      state.appErr = action?.payload || action.payload?.error?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //Upload Profile photo
    builder.addCase(uploadProfilePhototAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(uploadProfilePhototAction.fulfilled, (state, action) => {
      state.profilePhoto = action?.payload;
      state.profileImgUpdated = true;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(uploadProfilePhototAction.rejected, (state, action) => {
      state.appErr = action?.payload || action.payload?.error?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = null;
      state.loading = false;
      state.loggedOut = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr = action?.payload;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //logout
    builder.addCase(LoggedInUserAction.pending, (state, action) =>
    {
      
      state.loading = false;
    });
    builder.addCase(LoggedInUserAction.fulfilled, (state, action) =>
    {
      console.log("logged FulFF",action.payload)
      state.userAuth = action?.payload.user;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(LoggedInUserAction.rejected, (state, action) =>
    {
      console.log("logged regg",action.payload)
      // state.appErr = action?.payload;
      // state.serverErr = null;
      state.loading = false;
    });
  },
});

export const { reset } = usersSlices.actions;

export default usersSlices.reducer;
