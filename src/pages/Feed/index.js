import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';

import { Post, Header, Avatar, Name, Description, Loading } from './style';
import LazyImage from '../../components/LazyImage'

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
            `http://192.168.0.24:3000/feed?_expand=author&_limit=${limitRequest}&_page=${pageNumber}`
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
      <View>
          <FlatList // Listagem com scroll
            data={feed}
            keyExtractor={ post => String(post.id) }
            onEndReached={ () => loadPage() } //Funcao executada quando usuario chegar no fim da lista
            onEndReachedThreshold={0.1} // Quando usuario tiver 10% do final da lista ele carrega os proximos itens
            onRefresh={refreshList}
            refreshing={refreshing}
            onViewableItemsChanged={handleViewableChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
            ListFooterComponent={loading && <Loading />} //Carrega um item no final da lista
            renderItem={({ item }) => ( // Para cada post, o que ira mostrar na tela     
                <Post>
                    <Header>
                        <Avatar source={{ uri: item.author.avatar }} />
                        <Name>{item.author.name}</Name>
                    </Header>

                    <LazyImage
                        shoudLoad={viewable.includes(item.id)}
                        aspectRatio={item.aspectRatio}
                        smallSource={{ uri: item.small }}
                        source={{ uri: item.image }}
                    />
                    <Description>
                        <Name>{item.author.name}</Name> {item.description}
                    </Description>
                </Post>
            )}
          />
      </View>
  );
}
