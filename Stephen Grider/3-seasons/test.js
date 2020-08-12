const getNumber = (number) => {

        return number > 6 ? 'yes' : 'no';

}

const seasonConfiguration = {
        summer: {
                text: 'Let\'s hit the beach',
                iconName: 'sun'
        },
        winter: {
                text: 'Burr it is cold!',
                iconName: 'snowlake'
        }
};

console.log(seasonConfiguration['summer']);
console.log(seasonConfiguration.summer);

console.log(getNumber(5));
console.log('ff')