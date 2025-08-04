react-native run-android

npm install react-native-paper ,

npm install react-native ,

npm install native-base ,

npm install react-native-safe-area-context ,

npm install react-native-screens ,

npm install react-native-svg ,

npm install react-native-vector-icons ,

npm install


-------------------- change structure --------------------

create utils , API , context , 


-------------------- profileView ------------------

{/* Professional Details */}
<Box
  bg={isDarkMode ? '#374151' : '#FFFFFF'}
  borderRadius="2xl"
  p={wp(4)}
  mb={hp(2)}
  shadow={4}
  width="100%"
  zIndex={10}
>
  <VStack space={hp(2)}>
    <Text
      fontSize={wp(4.5)}
      fontWeight="bold"
      color={isDarkMode ? '#E5E7EB' : '#1F2937'}
      mb={1}
    >
      Professional Details
    </Text>
    {Object.keys(professionalOptions).map(key => (
      <Box
        key={key}
        zIndex={1000 - Object.keys(professionalOptions).indexOf(key)}
      >
        <Menu
          visible={menuVisibility[key]}
          onDismiss={() => toggleDropdownMenu(key)}
          anchor={
            <TextInput
              label={toTitleCase(key)}
              value={professionalDetails[key]}
              editable={false}
              right={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={wp(6)}
                      color={isDarkMode ? '#E5E7EB' : '#1F2937'}
                    />
                  )}
                  onPress={() => toggleDropdownMenu(key)}
                />
              }
              style={[
                styles.textInput,
                {
                  fontSize: wp(4),
                  backgroundColor: isDarkMode ? '#4B5563' : '#FFFFFF',
                  color: isDarkMode ? '#E5E7EB' : '#1F2937',
                  marginBottom: hp(0.5)
                },
              ]}
              placeholderTextColor={
                isDarkMode ? '#9CA3AF' : '#6B7280'
              }
              onPressIn={() => toggleDropdownMenu(key)}
            />
          }
          contentStyle={{
            backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
          }}
        >
          {professionalOptions[key].map(item => (
            <Menu.Item
              key={item}
              onPress={() =>
                handleDropdownSelect(key, item, 'professional')
              }
              title={item}
              titleStyle={{
                fontSize: wp(4),
                color: isDarkMode ? '#E5E7EB' : '#1F2937',
              }}
            />
          ))}
        </Menu>
      </Box>
    ))}
  </VStack>
</Box>

{/* Career Preferences */}
<Box
  bg={isDarkMode ? '#374151' : '#FFFFFF'}
  borderRadius="2xl"
  p={wp(4)}
  shadow={4}
  width="100%"
  zIndex={9}
>
  <VStack space={hp(2)}>
    <Text
      fontSize={wp(4.5)}
      fontWeight="bold"
      color={isDarkMode ? '#E5E7EB' : '#1F2937'}
      mb={1}
    >
      Your Career Preferences
    </Text>
    {Object.keys(careerPreferenceOptions).map(key => (
      <Box
        key={key}
        zIndex={1000 - Object.keys(careerPreferenceOptions).indexOf(key)}
      >
        <Menu
          visible={menuVisibility[key]}
          onDismiss={() => toggleDropdownMenu(key)}
          anchor={
            <TextInput
              label={toTitleCase(key)}
              value={careerPreferences[key]}
              editable={false}
              error={!!errors[key]}
              right={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={wp(5)}
                      color={isDarkMode ? '#E5E7EB' : '#1F2937'}
                    />
                  )}
                  onPress={() => toggleDropdownMenu(key)}
                />
              }
              style={[
                styles.textInput,
                {
                  fontSize: wp(4),
                  backgroundColor: isDarkMode ? '#4B5563' : '#FFFFFF',
                  color: isDarkMode ? '#E5E7EB' : '#1F2937',
                  borderColor: errors[key] ? 'red' : 'transparent',
                  marginBottom: hp(0.5)
                },
              ]}
              placeholder={`Select ${toTitleCase(key)}`}
              placeholderTextColor={
                isDarkMode ? '#9CA3AF' : '#6B7280'
              }
              onPressIn={() => toggleDropdownMenu(key)}
            />
          }
          contentStyle={{
            backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
          }}
        >
          {careerPreferenceOptions[key].map(item => (
            <Menu.Item
              key={item}
              onPress={() =>
                handleDropdownSelect(key, item, 'career')
              }
              title={item}
              titleStyle={{
                fontSize: wp(4),
                color: isDarkMode ? '#E5E7EB' : '#1F2937',
              }}
            />
          ))}
        </Menu>
        {errors[key] && (
          <Text color="red.500" fontSize={wp(3.5)} mt={1}>
            {errors[key]}
          </Text>
        )}
      </Box>
    ))}
  </VStack>
</Box>
