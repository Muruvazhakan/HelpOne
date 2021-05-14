import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../components/context';
// import  RetriveData  from '../Store/Datafromstorage/RetriveData';
import { styles as ProfileStyles } from './ProfileScreen/ProfileScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

export function DrawerContent(props) {
    // useEffect(() => {
    //     console.log('[Drawer Screen]: prop  userdetails    '+props.userdetails);
    //     console.log(props);  

    //     console.log('[Drawer Screen]: prop  userName     '+props.userdata); 
    // });
    const { width, height } = Dimensions.get('window');
    const screen_width = width;

    const paperTheme = useTheme();
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const { signOut, toggleTheme } = React.useContext(AuthContext);

    const user_data_user_name = useSelector(state =>
        state.helpone.user_name
    );

    const user_data_user_first_name = useSelector(state =>
        state.helpone.user_first_name
    );

    const user_data_user_email = useSelector(state =>
        state.helpone.user_email
    );

    const user_data_user_last_name = useSelector(state =>
        state.helpone.user_last_name
    );
    const user_data_isUserImageAvailable = useSelector(state =>
        state.helpone.isUserImageAvailable
    );

    const user_data_user_bood_donated = useSelector(
        state =>
            state.helpone.user_bood_donated
    );

    const user_data_user_bood_request_raised = useSelector(state =>
        state.helpone.user_bood_request_raised
    );

    return (
        <View style={{ flex: 1 }}>

            <DrawerContentScrollView {...props}>

                <View>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: '3%', alignSelf: 'center', paddingRight: '25%' }}>

                                {user_data_isUserImageAvailable ?
                                    <Image
                                        source={{ uri: user_data_isUserImageAvailable }}
                                        style={[ProfileStyles.profileImg, { height: screen_width / 2.5, width: screen_width / 2.5, borderColor: 'black', borderWidth: 1, }]}
                                        imageStyle={[{ borderRadius: screen_width / 10, }]} />
                                    :
                                    <FontAwesome name="user-circle-o" color={paperTheme.colors.text} size={screen_width / 2.5} />
                                }
                            </View>

                            <View style={{ 
                                justifyContent:'center'
                                // alignItems: 'flex-start'
                                 }}>
                                <Title style={[ProfileStyles.title]}>{user_data_user_name}</Title>
                                {user_data_user_first_name !== '' && user_data_user_first_name !== null ?
                                    <Caption style={[styles.caption]}>{user_data_user_first_name} {user_data_user_last_name}</Caption>
                                    : null}
                                {user_data_user_email !== '' && user_data_user_email !== null ?
                                    <Caption style={[styles.caption, { paddingBottom: '2%' }]}>{user_data_user_email}</Caption>
                                    : null}
                            </View>


                            <View style={styles.row}>
                                <View style={styles.section}>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>{((user_data_user_bood_donated === null || user_data_user_bood_donated === '') ? 0 : user_data_user_bood_donated)}</Paragraph>
                                    <Caption style={styles.caption}> Donated</Caption>
                                </View>
                                <View style={styles.section}>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>{((user_data_user_bood_request_raised === null || user_data_user_bood_request_raised === '') ? 0 : user_data_user_bood_request_raised)}</Paragraph>
                                    <Caption style={styles.caption}> Raised</Caption>
                                </View>
                            </View>
                        </View>

                    </View>


                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Main Home"
                            onPress={() => { props.navigation.navigate('MainHome') }}
                        />

                    </Drawer.Section>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Blood Home"
                            onPress={() => { props.navigation.navigate('BloodHome') }}
                        />

                    </Drawer.Section>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Fontisto name="blood-drop" color={color}
                                size={size} />
                        )}
                        label="My Blood Request"
                        onPress={() => { props.navigation.navigate('My_Request_Raised_Screen') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            // <Icon 
                            // name="bookmark-outline" 
                            // color={color}
                            // size={size}
                            // />
                            <Fontisto name="blood-drop" color={color}
                                size={size} />

                        )}

                        label="My Blood Donation"
                        onPress={() => { props.navigation.navigate('My_Blood_Donated_Screen') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (                            
                            <Icon
                            name="settings-outline"
                            color={color}
                            size={size}
                        />

                        )}
                        label="SOS Screen Setting"
                        onPress={() => { props.navigation.navigate('SOSScreen') }}
                    />
                    {/* <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="bookmark-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Bookmarks"
                        onPress={() => { props.navigation.navigate('BookmarkScreen') }}
                    /> */}
                    {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingScreen')}}
                        /> */}
                    {/* <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="account-check-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Support"
                        onPress={() => { props.navigation.navigate('SupportScreen') }}
                    /> */}
                     {/*  Theme is disabled
                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>

            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                {/* <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="settings-outline"
                            color={color}
                            size={size}
                        />
                    )}
                    label="settings"
                    onPress={() => { props.navigation.navigate('SettingsScreen') }}
                /> */}

                <DrawerItem

                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
            {/* <RetriveData userData={props} /> */}
        </View>
    );

}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: '2%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: '1%',
    },
    bottomDrawerSection: {
        marginBottom: '1%',
        borderTopColor: '#f4f4f4',
        // borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});