// import { SERVER_URL } from '@env';
import RequestError from '@errors/request';
import axios, { AxiosError } from 'axios';
import { useCallback, useMemo,/* useMemo, */useState } from 'react';

type AxiosParams = {
    body?: object;
    page?: number;
    target?: 'popular'
    language?: 'en-US';
}

export default function useAxios() {
    const SERVER_URL = 'https://api.themoviedb.org/3/movie'//popular?language=en-US&page=1
    const [loading, setLoading] = useState<boolean>(false);

    const options = useMemo(() => ({
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWRjZjc4MjlmZjMyN2MzNWRlYzJmNmEzZWQ4NmU2ZiIsIm5iZiI6MTcxMzg3OTExNy44MzcsInN1YiI6IjY2MjdiODRkMjU4ODIzMDE3ZDkzZTBhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yhYWH_2xwQYg-7A-jOrWns-cKvxcD7XmTEICZg9o77c'
        }
    }), [])


    const getRequest = useCallback(async ({ page = 1, target = 'popular', language = 'en-US' }: AxiosParams) => {
        setLoading(true);
        return await axios.get(
            `${SERVER_URL}/${target}?language=${language}&page=${page}`, options)
            .then(res => { return res.data.results })
            .catch((error: AxiosError) => { throw new RequestError(error.message, error.response?.status || 500); })
            .finally(() => setLoading(false));
    }, [options]);



    const postRequest = useCallback(async ({ body }: AxiosParams) => {
        setLoading(true);

        return await axios
            .post(`${SERVER_URL}/`, body, options)
            .then(res => res.data)
            .catch((error: AxiosError) => { throw new RequestError(error.message, error.response?.status || 500); })
            .finally(() => setLoading(false));
    }, [options]);

    // const obj = useMemo(() => { postRequest, getRequest, error, loading }, [postRequest, getRequest, error, loading]);

    // return {...obj};

    return { getRequest, postRequest, loading };
}
