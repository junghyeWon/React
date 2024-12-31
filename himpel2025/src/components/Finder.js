import styles from './Finder.module.css';
import './Finder.module.css';
import {useState} from "react";

function Finder(){
    const config = { //eslint-disable-line no-unused-vars
        residence : {
            question: '1. 주거형태를 선택해주세요.',
            option: [
                {content : '아파트', value: 'apartment'},
                {content : '주상복합/오피스텔', value: 'residential'},
                {content : '연립/빌라/단독', value: 'villa'},
                {content : '상가주택', value: 'commercialHouse'},
            ]
        },
        floor : {
            question: '2. 주거층수를 선택해주세요.',
            option: [
                {content: '저층(1~9F)', value: 'lowRise' },
                {content: '중층(10~19F)', value: 'midRise' },
                {content: '고층(20F~)', value: 'highRise'}
            ]
        },
        space : {
            question: '3. 주거평형을 선택해주세요. (※ 1평 = 3.3㎡)',
            option: [
                {content: '10평~20평대', value: '10-20'},
                {content: '30평~40평대', value: '30-40'},
                {content: '40평대 이상', value: '40plus'}
            ]
        },
        etc : {
            question: '기타 사항을 선택해주세요.',
            option: [
                {content: '없음', value: 'none'},
                {content: '영유아/어르신', value: 'toddlerAndElder'},
                {content: '담배냄새유입', value: 'cigarettes'},
                {content: '흡연자/반려동물', value: 'smokerAndPet'},
                {content: '복합기능', value: 'complex'}
            ]
        }
    }
    const ventilation = { //eslint-disable-line no-unused-vars
        vent01 : {
            residence : 'apartment',
            floor : '4th',
            space: 35,
            etc : ['smoker', 'pet', 'complex']
        },
        vent02 : {
            residence : 'apartment',
            floor : '18th',
            space: 35,
            etc : ['toddler', 'cigarettes']
        },
        vent03 : {
            residence : 'commercialHouse',
            floor : '1st',
            space: 15,
            etc : ['elder', 'smoker']
        },
        vent04 : {
            residence : 'residential',
            floor : '37th',
            space: 45,
            etc : ['complex', 'pet']
        },
        vent05 : {
            residence : 'apartment',
            floor : '27th',
            space: 30,
            etc : ['toddler', 'pet']
        },
        vent06 : {
            residence : 'villa',
            floor : '16th',
            space: 24,
            etc : []
        },
        vent07 : {
            residence : 'residential',
            floor : '7th',
            space: 35,
            etc : ['smoker']
        },
        vent08 : {
            residence : 'apartment',
            floor : '30th',
            space: 40,
            etc : ['toddler', 'pet', 'cigarettes']
        },
        vent09 : {
            residence : 'apartment',
            floor : '27th',
            space: 30,
            etc : ['toddler', 'pet']
        },
        vent10 : {
            residence : 'commercialHouse',
            floor : '3rd',
            space: 35,
            etc : ['cigarettes', 'smoker']
        },
        vent11 : {
            residence : 'villa',
            floor : '6th',
            space: 24,
            etc : ['elder']
        },
        vent12 : {
            residence : 'apartment',
            floor : '45th',
            space: 50,
            etc : ['complex']
        },
        vent13 : {
            residence : 'commercialHouse',
            floor : '1st',
            space: 32,
            etc : ['cigarettes']
        },
        vent14 : {
            residence : 'apartment',
            floor : '27th',
            space: 30,
            etc : ['toddler', 'pet']
        },
        vent15 : {
            residence : 'commercialHouse',
            floor : '2nd',
            space: 35,
            etc : ['cigarettes', 'smoker']
        },
        vent16 : {
            residence : 'villa',
            floor : '6th',
            space: 24,
            etc : ['elder']
        },
        vent17 : {
            residence : 'apartment',
            floor : '45th',
            space: 50,
            etc : ['complex']
        },
        vent18 : {
            residence : 'commercialHouse',
            floor : '2nd',
            space: 39,
            etc : ['smoker', 'pet', 'complex', 'toddler']
        },
        vent19 : {
            residence : 'commercialHouse',
            floor : '1st',
            space: 12,
            etc : ['toddler', 'pet', 'complex']
        },
        vent20 : {
            residence : 'commercialHouse',
            floor : '1st',
            space: 8,
            etc : []
        },
        vent21 : {
            residence : 'commercialHouse',
            floor : '3rd',
            space: 45,
            etc : ['cigarettes', 'elder']
        },
        vent22 : {
            residence : 'apartment',
            floor : '45th',
            space: 50,
            etc : ['complex']
        },
        vent23 : {
            residence : 'residential',
            floor : '38th',
            space: 50,
            etc : ['cigarettes']
        },
        vent24 : {
            residence : 'villa',
            floor : '3rd',
            space: 30,
            etc : ['pet','elder']
        },
        vent25 : {
            residence : 'villa',
            floor : '1st',
            space: 8,
            etc : []
        }
    }

    // const [configs, setConfigs] = useState(); //eslint-disable-line no-unused-vars

    return (
        <div>
            <div className={styles.finder}>
                <h2>맞춤 환기제품 찾기</h2>
                {/*{config.map(list => {
                    return <Feed key={list.id} {...list} />
                })}*/}
            </div>
        </div>
    );
}

export default Finder;