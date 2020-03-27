import React from 'react'
import {View,Text,TouchableOpacity,Image, Linking} from 'react-native'
import logoImg from '../../assets/logo.png'
import styles from './styles'
import {Feather}  from '@expo/vector-icons' 
import {useNavigation, useRoute} from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'


export default function Detail(){

  const route = useRoute()
  const navigation = useNavigation()
  const incident = route.params.incident
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajuda no caso "${incident.title}" com o valor de : ${Intl.NumberFormat('PT-BR',{style: 'currency',currency:'BRL'}).format(incident.value)}`

  function navigateBack(){
    navigation.goBack()    
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject:`Herói do caso: ${incident.description}`,
      recipients: [incident.email],
      body: message

    })
  }
  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }
  return (
      <View style={styles.container}>
         <View style={styles.header}>
          <Image source={logoImg}/>
          <TouchableOpacity onPress={navigateBack}>
            <Feather name="arrow-left" size={28} color="#e82041"/>
          </TouchableOpacity>
        </View>

        <View style={styles.incident}>
            <Text style={[styles.incidentProperty,]}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

            <Text style={styles.incidentProperty}>Caso</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>

            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('PT-BR',{
              style: 'currency',
              currency:'BRL'
            }).format(incident.value)}
            </Text>
        </View>
        
        <View style={styles.contactBox}>
            <Text style={styles.heroTitle}>Salve o Dia !</Text>
            <Text style={styles.heroTitle}>Seja o Herói desse caso.</Text>

            <Text style={styles.heroDescription}>Entre em contato:</Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                <Text style={styles.actionText}>WhatsApp  </Text>

              </TouchableOpacity>
              <TouchableOpacity style={styles.action} onPress={sendMail}>
                <Text style={styles.actionText}>E-mail </Text>
              </TouchableOpacity>

            </View>
           </View>
      </View>
)
}