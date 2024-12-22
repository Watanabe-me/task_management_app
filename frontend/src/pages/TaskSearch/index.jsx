import { Header } from "components/Header/Header";
import { SearchBar } from "components/SearchBar";
import { TaskAccordion } from "components/TaskAccordion";
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useMemberTaskList } from 'hooks/useMemberTaskList';
import { getStatusTaskList } from "utils/getStatusTaskList";

import { Box, Stack, Typography } from '@mui/material';

const TaskSearch = () => {
    const {
        partedMemberTaskList,
        isLoading,
        error,
        getMemberTaskList,
        refreshTaskList
    } = useMemberTaskList();
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState('');

    // フィルタリングされたタスクを計算
    const filteredTasks = partedMemberTaskList.map((userData) => {
        // ユーザー別のタスクリストを検索語でフィルタリング
        const filteredTaskList = userData.taskList.filter((taskData,index) => {
            let title = taskData.tasks[index].title
            return title.toLowerCase().includes(searchQuery.toLowerCase());
        });

        return {
            ...userData, // ユーザー情報はそのまま
            taskList: filteredTaskList // フィルタリングされたタスクリスト
        };
    });

    useEffect(() => {
        if(cookies.accessToken === void 0){
            navigate('/login')
        }
        getMemberTaskList();
    },[getMemberTaskList]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Box sx={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: { xs: 'auto', md: 'hidden' } 
        }}>
            <Header />
            <Box sx={{ width: '100%' }}>
                <Box sx={{m:3}}>
                    <SearchBar 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery}
                    />
                </Box>
                <Box 
                sx={{ 
                    m:3,
                    '--Grid-borderWidth': '2px',
                    border: 'var(--Grid-borderWidth) solid',
                    borderColor: '#c2d8e1',
                    borderRadius: '10px',
                    backgroundColor: "#FAFAFA"
                }}>
                    <Stack 
                    sx={{ 
                        // 画面サイズに応じて動作変更
                        flexGrow: { xs: 'unset', md: 1 },
                        // 縦並び時の高さ調整
                        minHeight: { xs: 'fit-content', md: 'calc(100vh - 250px)' },
                        flexDirection: { xs: 'column', md: 'row' },
                        maxWidth: '100vw',  
                        overflowX: 'auto', 
                    }}
                    >
                        {/* タスク */}
                        {partedMemberTaskList.map((userTask) => (
                            <Box
                            key={userTask.user}
                            sx={{ 
                                height: { xs: 'auto', md: 'calc(100vh - 300px)' },
                                minWidth: { xs: 'auto', md: '20vw' },
                                flexShrink: 0,
                                mb: { xs: 2, md: 0 },
                                p: 3,
                            }}>
                                <Typography variant="h6" component="div">{userTask.user}</Typography>
                                    <Box size={12}
                                    spacing={1}
                                    sx={{
                                        maxHeight: 'calc(100vh - 330px)',  
                                        overflowY: 'auto',  
                                    }}>
                                        {userTask.taskList.map((tasks, index) => (
                                            <TaskAccordion 
                                                key={index}
                                                taskList={tasks.tasks}
                                                statusName={tasks.statusName}
                                                onTaskUpdate={refreshTaskList}
                                            />
                                        ))}
                                    </Box>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
        </>
    );
}
export default TaskSearch;

