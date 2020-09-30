# ekommunal-electricity-balance
Simply parses e-kommunal page and extract data as array

## Build
```npm run build```

## Usage
```npm start```

```npm build:html // will generate html table with the data```

# Required env variables (you should define them before use):

```
ACCOUNT_ID=<7_DIGITS>
URL=http://ek.uz/ru/cabinet/payment-public/balance?id=3 // this is acctualy default url
REGION=Tsh // if want to use another region please find corresponding values in parseRegions output 
SUBREGION=Mir U // same as above
```
