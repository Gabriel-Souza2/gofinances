import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'; 
import  { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import uuid from 'react-native-uuid';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect, Category } from '../CategorySelect';

import { StoreTransancions } from '../../services/store';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType
} from './style';

interface FormData {
    name: string;
    amount: string;
}

const schema = yup.object({
    name: yup
        .string()
        .required("O nome é obrigatorio!"),
    amount: yup
        .number()
        .required("O preço é obrigatorio!")
        .typeError("Informe um valor numerico!")
        .positive("O valor não pode ser negativo!")
})

export function Register(){
    const [transactionType, setTransactionType] = useState<'up' | 'down' | ''>('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categorias'
    });
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const navigation = useNavigation();

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleSetCategory(category: Category) {
        setCategory(category);
    }

    function handleCloseCategoryModal() {
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData) {
        if (transactionType == '') { 
            return Alert.alert("Selecione o tipo de transição!") 
        }

        if (category.key == 'category') { 
            return Alert.alert("Selecione a categoria!") 
        }
        const data ={
            id: String(uuid.v4()),
            type: transactionType,
            name: form.name,
            amount: form.amount,
            categoryKey: category.key,
            date: new Date().toString()
        }

        try {
            await StoreTransancions.set(data);
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categorias'
            });
            reset();

          navigation.navigate("Listagem");
        }
        catch(error) {
            console.log(error);
            Alert.alert("Não foi possivel salvar");
        }



    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                    <Header>
                        <Title>
                            Cadastro
                        </Title>
                    </Header>
                    <Form>
                        <Fields>
                            <InputForm
                                control={control}
                                name="name"
                                placeholder='Nome'
                                autoCapitalize='words'
                                autoCorrect={false}
                                error={errors.name && errors.name.message}
                            />
                            <InputForm 
                                control={control}
                                name="amount"
                                placeholder='Preço'
                                keyboardType='numeric'
                                error={errors.amount && errors.amount.message}

                            />
                            <TransactionsType>
                                <TransactionTypeButton 
                                    type='up'
                                    title="Income"
                                    onPress={() => handleTransactionsTypeSelect('up')}
                                    isActive={transactionType === 'up'}
                                />
                                <TransactionTypeButton 
                                    type='down'
                                    title="Outcome"
                                    onPress={() => handleTransactionsTypeSelect('down')}
                                    isActive={transactionType === 'down'}
                                />
                            </TransactionsType>
                            <CategorySelectButton title={category.name} onPress={handleOpenCategoryModal}/>
                        </Fields>
                        <Button title='Enviar' onPress={handleSubmit(handleRegister)}/>
                    </Form>

                    <Modal visible={categoryModalOpen} animationType="slide">
                        <CategorySelect 
                            category={category}
                            setCategory={handleSetCategory}
                            closeSelectCategory={handleCloseCategoryModal}
                        />
                    </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}