export enum State
{
    Unchanged = 0,
    Added = 1,
    Modified = 2,
    Deleted = 3
}
export class BaseClass
{
    public stateEnum: State;

    constructor(){
        this.stateEnum = State.Unchanged;
    }
}