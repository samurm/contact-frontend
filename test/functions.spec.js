describe('form.service.js', () => {
    
    let formDatas;
    let serviceRegexp;

    beforeEach(() => {
        serviceRegexp = new ServiceRegexp();

        formDatas = {
            NAME_CORRECT : "samuel",
            NAME_INCORRECT : "12",
            SURNAME_CORRECT : "Ramos",
            SURNAME_INCORRECT : "12A",
            AGE_CORRECT : "27",
            AGE_INCORRECT : "ab",
            PHONE_CORRECT : "665123456",
            PHONE_INCORRECT : "165123456"
        }
    }); 

    describe('#isValidName', () => {

        describe('should be true', ()=>{

            it('when name has a correct format', ()=>{
                expect(serviceRegexp.isValidName(formDatas.NAME_CORRECT)).toBeTruthy();
            });

        });

        describe('should be false', ()=>{

            it('when name has an incorrect format', ()=>{
                expect(serviceRegexp.isValidName(formDatas.NAME_INCORRECT)).toBeFalsy();
            });

        });
    });

    describe('#isValidSurname', () => {

        describe('should be true', ()=>{

            it('when surname surname has a correct format', ()=>{
                expect(serviceRegexp.isValidSurname(formDatas.SURNAME_CORRECT)).toBeTruthy();
            });

        });

        describe('should be false', ()=>{

            it('when surname has an incorrect format', ()=>{
                expect(serviceRegexp.isValidSurname(formDatas.SURNAME_INCORRECT)).toBeFalsy();
            });

        });
    });

    describe('#isValidAge', () => {

        describe('should be true', ()=>{

            it('when age is more than 0 and number', ()=>{
                expect(serviceRegexp.isValidAge(formDatas.AGE_CORRECT)).toBeTruthy();
            });

        });

        describe('should be false', ()=>{

            it('when age is a letter', ()=>{
                expect(serviceRegexp.isValidAge(formDatas.AGE_INCORRECT)).toBeFalsy();
            });

        });
    });

    describe('#isValidPhone', () => {

        describe('should be true', ()=>{

            it('when phone has a correct format', ()=>{
                expect(serviceRegexp.isValidPhone(formDatas.PHONE_CORRECT)).toBeTruthy();
            });

        });

        describe('should be false', ()=>{

            it('when phone has an incorrect format', ()=>{
                expect(serviceRegexp.isValidPhone(formDatas.PHONE_INCORRECT)).toBeFalsy();
            });
        });
    });
});