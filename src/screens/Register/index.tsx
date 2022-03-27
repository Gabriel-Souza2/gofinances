import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'; 
import  { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect, Category } from '../CategorySelect';

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
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categorias'
    });
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

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

    function handleRegister(form: FormData) {
        if (transactionType == '') { 
            return Alert.alert("Selecione o tipo de transição!") 
        }

        if (category.key == 'category') { 
            return Alert.alert("Selecione a categoria!") 
        }
        const data ={
            name: form.name,
            amount: form.amount,
            category: category.key,
            transactionType
        }

        console.log(data)
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