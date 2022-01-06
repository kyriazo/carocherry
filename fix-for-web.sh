    #!/bin/bash

    echo 'Fixing PropTypes issues, for running expo start:web (for web)';
    echo "for reference: https://github.com/necolas/react-native-web/issues/1537";

    for import in "ViewPropTypes, ColorPropType, EdgeInsetsPropType, PointPropType, requireNativeComponent"
    do
        echo "Fixing $import ..."
        if grep -q "export const $import = { style: null };" ./node_modules/react-native-web/dist/index.js; then
            echo "$import fixed already!"
        else
            echo -e "\nexport const $import = { style: null };">> ./node_modules/react-native-web/dist/index.js
        fi
    done