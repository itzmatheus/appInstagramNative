import React, { useState, useEffect, useCallback, Component } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity} from 'react-native';

import {
    styles,
    Post,
    Header,
    Avatar,
    Name,
    Hashtags,
    More,
    Description,
    Loading,
    NumberLikes,
    FeedItemFooter,
    ActionsButtons,
    Likes
    } from './style';

import urlApiFeed from '../../config/global';

import LazyImage from '../../components/LazyImage'

import like from '../../assets/ActionsButtons/like.png';
import comment from '../../assets/ActionsButtons/comment.png';
import send from '../../assets/ActionsButtons/send.png';
import more from '../../assets/ActionsButtons/more.png';
import camera from '../../assets/ActionsButtons/camera.png';

export default function Feed() {

    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [viewable, setViewable] = useState([]);


    const limitRequest = 4;

    async function loadPage(pageNumber = page, shouldRefresh = false) {
        if (total && pageNumber > total) return;

        setLoading(true);

        const response = await fetch(
            `${urlApiFeed}/feed?_expand=author&_limit=${limitRequest}&_page=${pageNumber}`
        );
    
        const data = await response.json();
        const totalItems = response.headers.get('X-Total-Count');
        
        setTotal(Math.floor(totalItems/limitRequest));
        setFeed(shouldRefresh ? data : [...feed, ...data]);
        setPage(pageNumber + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadPage();
    }, []);

    async function refreshList() {
        setRefreshing(true);

        await loadPage(1, true);

        setRefreshing(false);
    }

    const handleViewableChanged = useCallback(({ changed }) => {
        setViewable(changed.map(({ item }) => item.id)); 
    }, []);

  return (
      <navigationOptions />,
      <View>
          <FlatList // Listagem com scroll
            data={feed}
            keyExtractor={ post => String(post.id) }
            onEndReached={ () => loadPage() } //Funcao executada quando usuario chegar no fim da lista
            onEndReachedThreshold={0.1} // Quando usuario tiver 10% do final da lista ele carrega os proximos itens
            onRefresh={refreshList}
            refreshing={refreshing}
            onViewableItemsChanged={handleViewableChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
            ListFooterComponent={loading && <Loading />} //Carrega um item no final da lista
            renderItem={({ item }) => ( // Para cada post, o que ira mostrar na tela     
                <Post>
                    <Header>
                        <Avatar source={{ uri: item.author.avatar }} />
                        <Name>{item.author.name}</Name>
                        <TouchableOpacity style={ styles.buttonMore }>
                            <More source={more} />
                        </TouchableOpacity>
                    </Header>

                    <LazyImage
                        shoudLoad={viewable.includes(item.id)}
                        aspectRatio={item.aspectRatio}
                        smallSource={{ uri: item.small }}
                        source={{ uri: item.image }}
                    />
                    <FeedItemFooter>
                        <ActionsButtons>
                            <TouchableOpacity style={ styles.action }>
                                <Image source={like}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={ styles.action }>
                                <Image source={comment} />
                            </TouchableOpacity>
                            <TouchableOpacity style={ styles.action }>
                                <Image source={send}/>
                            </TouchableOpacity>
                        </ActionsButtons>
                        <Likes>
                            <NumberLikes>10 Curtidas</NumberLikes>
                        </Likes>
                        <Description>
                            <Name>{item.author.name}</Name> {item.description}
                        </Description>
                        <Hashtags>#top #smatheus</Hashtags>
                    </FeedItemFooter>
                </Post>
            )}
          />
      </View>
  );

  
}

Feed.navigationOptions = ({ navigation }) => ({
    headerRight: (
        <TouchableOpacity onPress={ () => navigation.navigate('New') }>
            <Image style={ { marginRight: 20 } } source={camera} />
        </TouchableOpacity>
    ),
});