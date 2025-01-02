import styles from './Finder.module.css';
import './Finder.module.css';
import {useState} from "react";

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
};
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
};

const configMap = {
    residenceMap : {
        apartment: '아파트',
        residential: '주상복합/오피스텔',
        villa: '연립/빌라/단독',
        default: '상가주택'
    },
    etcMap : {
        none: '',
        toddler: '영유아',
        elder: '어르신',
        cigarettes: '담배냄새유입',
        smoker: '흡연자',
        pet: '반려동물',
        complex: '복합건물'
    }
}

function Finder(){
    const configEntries = Object.entries(config);
    const compareVent = {...ventilation};

    const [isSearched, setIsSearched] = useState(false);
    const [selected, setSelected] = useState({residence : [], floor : [], space : [], etc : []});
    const [results, setResults] = useState([]);

    // 선택값
    const handleToggleCheck = (e) => {
        const { name, id, checked } = e.target;
        setSelected(prevSelected => ({
            ...prevSelected,
            [name]: checked
                ? [...(prevSelected[name] || []), id]
                : (prevSelected[name] || []).filter(item => item !== id)
        }));
    }

    const filteredResults = () => {
        const results = filterVentilation(selected, compareVent);
        console.log('결과값', results);

        setResults(results);
        setIsSearched(true);
    }

    // 필터링
    const filterVentilation = (filters, ventilation) => {
        return Object.entries(ventilation).filter(([_, value]) => {
            return ['residence', 'floor', 'space', 'etc'].every(key => {
                if (filters[key].length === 0) return true;
                // 층수 필터링
                if (key === 'floor') return filters[key].includes(getFloorCategory(value[key]));
                // 평수 필터링
                if (key === 'space') return filters[key].includes(getSpaceCategory(value[key]));
                // 기타사항 필터링
                if (key === 'etc') {
                    const categorySet = getEtcCategory(filters[key]);
                    return (
                        (value[key] && Array.isArray(value[key]) && value[key].length === 0 && filters[key].includes('none')) ||
                        (Array.isArray(value[key]) && value[key].some(category => categorySet.includes(category)))
                    );
                }
                // 층수, 평수, 기타 외 1:1 매칭 필터링
                return filters[key].includes(value[key]);
            });
        }).map(([key]) => key);
    }

    // 층수 (저층, 중층, 고층일 경우 구분용 함수)
    const getFloorCategory = (floor) => {
        const floorNumber = parseInt(floor);
        return isNaN(floorNumber)
            ? 'unknown'
            : floorNumber < 10 ? 'lowRise' :
                floorNumber < 20 ? 'midRise' :
                    floorNumber >= 20 ? 'highRise' : 'unknown';
    }

    // 평수 (10~22평, 30~40평, 40평대 이상 구분용 함수)
    const getSpaceCategory = (space) => {
        const spaceNumber = parseInt(space);
        return isNaN(spaceNumber)
            ? 'unknown'
            : spaceNumber < 30 ? '10-20' :
                spaceNumber < 40 ? '30-40' :
                    spaceNumber >= 40 ? '40plus' : 'unknown';
    }

    // 기타사항 (합산 카테고리 세분화 함수)
    const getEtcCategory = (filter) => {
        const categoryMap = {
            toddlerAndElder: ['toddler', 'elder'],
            smokerAndPet: ['smoker', 'pet'],
            none: ['none']
        };
        return filter.flatMap(item => categoryMap[item] || [item]);
    }

    return (
        <div>
            <div className={styles.finder}>
                {configEntries.map(([key, {question, option}]) => {
                    return (
                        <div key={key} className={styles.finder__question_box}>
                            <strong>{question}</strong>
                            {option.map((item) => (
                                <p key={item.value}>
                                    <label htmlFor={item.value}>
                                        <span>{item.content}</span>
                                        <input type="checkbox" name={key} id={item.value} onChange={handleToggleCheck} />
                                    </label>
                                </p>
                            ))}
                        </div>
                    );
                })}
                <button className={styles.finder__result_btn} onClick={filteredResults}>맞춤 환기제품 찾기</button>
            </div>

            { isSearched && results.length > 0 ? (
                <div className={styles.finder__result_wrap}>
                    {results.map((key) => (
                        <div key={key} className={styles.finder__vent_item}>
                            <strong>{key}</strong>
                            <ul>
                                <li>주거형태: {configMap.residenceMap[compareVent[key].residence] || configMap.residenceMap.default} ({compareVent[key].floor.replace(/\D/g, '')}층/{compareVent[key].space}평)</li>
                                <li>기타사항: {compareVent[key].etc.map(item => configMap.etcMap[item] || configMap.etcMap.default).join(', ')}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            ) : isSearched ? (
                <p>매칭된 항목이 없습니다.<br />다시 선택해 주세요.</p>
            ) : null }
        </div>
    );
}

export default Finder;