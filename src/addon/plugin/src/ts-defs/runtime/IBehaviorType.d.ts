
/** Represents a behavior type in a project (the behavior equivalent of an object type). */
declare class IBehaviorType
{
    readonly runtime: IRuntime;
    readonly behavior: IBehavior;
    readonly name: string;
}
