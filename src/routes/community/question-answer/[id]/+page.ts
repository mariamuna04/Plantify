export const load = async ({fetch, params}: any) => {
    let questionID: string = params.id;

    const response = await fetch('/api/QuestionAnswer/SearchQuestionByID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: questionID})
    });
    const data = await response.json();
    const id = data._id;

    const fetchedReply = await fetch('/api/QuestionAnswer/SearchAnswerByParentID', {
        method: 'POST',
        body: JSON.stringify({parentQuestionID: id}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const reply = await fetchedReply.json();

    return {
        question: JSON.stringify(data),
        reply: JSON.stringify(reply)
    }
}