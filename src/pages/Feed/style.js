import styled from 'styled-components';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    buttonMore: {
        position: 'absolute',
        right: 15
    },
    action: {
        marginRight: 10,
    }

});

export const Post = styled.View`
    margin-top: 10px;
    width: 100%;
`;

export const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;

export const Avatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 10px;
`;

export const Name = styled.Text`
    color: #333;
    font-weight: bold;
`;

export const Description = styled.Text`
    line-height: 18px;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 'small',
    color: '#999',
})`
    margin: 30px 0;
`;

export const FeedItemFooter = styled.View`
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 10px;
`;

export const ActionsButtons = styled.View`
    flex-direction: row;
`;

export const Likes = styled.View`
    margin-top: 10px;
`;

export const NumberLikes = styled.Text`
    font-weight: bold;
    color: #000;
`;

export const Hashtags = styled.Text`
    color: #7159c1;
`;

export const More = styled.Image`
`;
