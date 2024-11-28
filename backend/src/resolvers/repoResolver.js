import { AuthenticationError } from 'apollo-server-express';
import { Octokit } from '@octokit/core';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    request: { fetch }, 
});

const fetchRepoReleaseData = async (owner, repo) => {
    try {
        const { data } = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
            owner,
            repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        console.log(data);
        return {
            latest_version: data.tag_name,
            latest_release_date: data.published_at,
            release_html: data.body,
        };
    } catch (error) {
        console.error("Error fetching GitHub release data:", error);
        return { latest_version: '', latest_release_date: '', release_html: '' };
    }
};

export const repoResolvers = {
    Query: {
        myRepos: async (_, __, { userId, client }) => {
            if (!userId) throw new AuthenticationError('Unauthorized');

            const result = await client.query(
                'SELECT * FROM repositories WHERE user_id = $1',
                [userId]
            );
            return result.rows;
        },
    },

    Mutation: {
        addRepo: async (_, { name, owner }, { userId, client }) => {
            if (!userId) throw new AuthenticationError('Unauthorized');

            const { latest_version, latest_release_date, release_html } = await fetchRepoReleaseData(owner, name);

            const result = await client.query(
                'INSERT INTO repositories (name, owner, user_id, latest_version, latest_release_date, release_html, has_seen) ' +
                'VALUES ($1, $2, $3, $4, $5, $6, $7) ' +
                'RETURNING id, name, owner, latest_version, latest_release_date, release_html, has_seen, user_id',
                [name, owner, userId, latest_version, latest_release_date, release_html, false]
            );

            return result.rows[0];
        },

        markAsSeen: async (_, { repoId }, { userId, client }) => {
            if (!userId) throw new AuthenticationError('Unauthorized');

            const result = await client.query(
                'UPDATE repositories SET has_seen = $1 WHERE id = $2 AND user_id = $3 ' +
                'RETURNING id, name, release_date, has_seen, user_id, latest_version, latest_release_date',
                [true, repoId, userId]
            );

            return result.rows[0];
        },
    },
};
