import axios from 'axios';
import { Header } from "components/Header/Header";
import { API_USER_URL } from "configs/ApiRouteUrl";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography
} from '@mui/material';

const Signup = (data) => {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, errors } = useForm();

    // サーバのURL
    const url = `${API_USER_URL}user-create/`;

    const createUser = async (data) =>{
        // 新規ユーザーを作成
        try{
            await axios.post(url,data,)
            navigate('/login/');
        }
        catch(error){
            if(error)
            alert(`ユーザーの作成に失敗しました。 ${error.response.request.responseText}`);
        };
    };

return (
    <>
    <Header />
    <Container
    maxWidth="xs" 
    sx={{ p:5 }}
    >
        <Card sx={{ minWidth: 275, p:3 }}>
            <Typography variant="h5" component="div">
                新規登録
            </Typography>
            <CardContent>
                <form onSubmit={handleSubmit(createUser)}>
                    <TextField
                        label="ユーザー名"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        {...register('username')}
                    />
                    <TextField
                        label="メールアドレス"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        {...register('email')}
                    />
                    <TextField
                        label="パスワード"
                        fullWidth
                        margin="normal"
                        type="password"
                        variant="standard"
                        sx={{mb:3}}
                        {...register('password', { required: true })} 
                    />
                    <Button variant="contained" sx={{backgroundColor: "#05a7be"}} type="submit">新規登録</Button>
                </form>
            </CardContent>
        </Card>
    </Container>
    </>
);
}

export default Signup;