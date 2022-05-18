import React from 'react';
import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from '../../hooks/auth';
import { Alert } from 'react-native';

import Logo from '../../assets/logo.svg';
import Google from '../../assets/google.svg';
import Apple from '../../assets/apple.svg';


import {
    Container,
    Header,
    TitleWraper,
    Title,
    SubTitle,
    Footer,
    FooterWraper
} from './styles';
import { SignInSocialButton } from '../../components/SignInSocialButton';


export function SignIn () {
    const { signInWithGoogle } = useAuth();

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possivel fazer o login");
        }
    }
    return (
        <Container>
            <Header>
                <TitleWraper>
                    <Logo width={RFValue(120)} height={RFValue(68)}></Logo>
                    <Title>Controle suas{'\n'}finanças de forma{'\n'}muito simples</Title>
                </TitleWraper>
                <SubTitle>Faça seu login com{'\n'}uma das contas abaixo</SubTitle>
            </Header>
            <Footer>
                <FooterWraper>
                    <SignInSocialButton title="Entrar com Google" svg={Google} onPress={handleSignInWithGoogle}/>
                    <SignInSocialButton title="Entrar com Apple" svg={Apple}/>

                </FooterWraper>

            </Footer>
        </Container>
    )
}