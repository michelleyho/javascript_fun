// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
    return {
        _specimenNum : specimenNum, 
        _dna : dna,
        _survivalRate: 0,
        get dna(){
            return this._dna;
        },
        get specimenNum(){
            return this._specimenNum;
        },
        get survivalRate(){
            return this._survivalRate;
        },
        mutate(){
            const mutateIndex = Math.floor(Math.random()*15);
            let newStrand = "";
            do {
               newStrand = returnRandBase(); 
            } while (newStrand === dna[mutateIndex])

            console.log(`Changing dna index ${mutateIndex} from ${dna[mutateIndex]} to ${newStrand}`)
            this._dna[mutateIndex] = newStrand;
            
            return this._dna;
        },

        compareDNA(otherCreature){
            let sameCount = 0;
            for(let i=0; i<this._dna.length; i++){
                if (this._dna[i] === otherCreature.dna[i]){
                    sameCount++;
                }
            }
            let percentSame = (sameCount / 15)*100;
            console.log(`Specimen #1 and Specimen #2 have ${percentSame}% DNA in common`);

        },

        willLikelySurvive(){
            let count = 0;
            for(let i=0; i<this._dna.length; i++){
                if (this.dna[i] === 'C' || this.dna[i] === 'G'){
                    count++;
                }
            }
            this._survivalRate = (count/15)*100;
            console.log("SurvivalRate");
            console.log(this._survivalRate);
            return this._survivalRate >= 60;
        }
    }
};


let creature1 = pAequorFactory(1, mockUpStrand());
let creature2 = pAequorFactory(1, mockUpStrand());
console.log(creature1);
console.log(creature2);
creature1.compareDNA(creature2);

console.log(creature1.willLikelySurvive());
console.log(creature2.willLikelySurvive());


const speciesSample = []
let speciesId = 3;
while (speciesSample.length < 30){
    const candidate = pAequorFactory(speciesId, mockUpStrand());
    if (candidate.willLikelySurvive()){
        speciesSample.push(candidate)
    }   
    speciesId++;
} 

for (let i=0; i<speciesSample.length; i++){
    const testSubject = speciesSample[i];
    console.log(`${testSubject.specimenNum}. Survival Rate: ${testSubject.survivalRate}`);
}
